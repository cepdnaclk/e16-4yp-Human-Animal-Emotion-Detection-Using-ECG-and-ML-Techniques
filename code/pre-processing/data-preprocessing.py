import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
from scipy.signal import butter, lfilter
from scipy import signal
import numpy
import time
from peakutils.peak import indexes

DATA_DIR = "sample_data/"

data = []
def read(file):
    print("reading ...")
    with open(file, 'r') as FP:
        for x in FP:
            values = x.split(':') 
            if (len(values) == 2 and (values[1].rstrip('\r\n'))!=''):
                data.append(int(values[1].rstrip('\r\n')))
        # data = [int() for x in FP]
    return data

def butter_bandpass(lowcut, highcut, fs, order=5):
    '''
    Implement Butterworth BandPass Filter
    :param lowcut: lower cut of for ecg
    :param highcut: higher cutoff for ecg
    :param fs: sampling rate of the signal
    :param order: order of the filter
    :return: filter factors
    '''
    nyq = 0.5 * fs
    low = lowcut / nyq
    high = highcut / nyq
    b, a = butter(order, [low, high], btype='band')
    return b, a

def butter_bandpass_filter(data, lowcut, highcut, fs, order=5):
    '''
    Filter the signal using the BW filter
    :param data: ecg signal
    :param lowcut:
    :param highcut:
    :param fs:
    :param order:
    :return:
    '''
    b, a = butter_bandpass(lowcut, highcut, fs, order=order)
    y = lfilter(b, a, data)
    return y

def de_trend(signal_in):
    '''
    De-Trend a ECG signals window size [1N/8:2N/8]
    :param signal_in: input signal (after bandpass filtering)
    :return: DE-trended signal
    '''
    return signal.detrend(signal_in, bp=[int(len(signal_in) / 8),
                                         int(2*len(signal_in) / 8),
                                         int(3 * len(signal_in) / 8),
                                         int(4 * len(signal_in) / 8),
                                         int(5 * len(signal_in) / 8),
                                         int(6 * len(signal_in) / 8),
                                         int(7 * len(signal_in) / 8),
                                         ])

def smooth(x, window_len=11, window='hanning'):
    '''
    Smooth a given signal
    :param x: signal
    :param window_len: smoothing kernel length
    :param window: window type
    :return: smoothed signal
    '''
    if x.size < window_len:
        raise (ValueError, "Input vector needs to be bigger than window size.")

    if window_len < 3:
        return x

    if not window in ['flat', 'hanning', 'hamming', 'bartlett', 'blackman']:
        raise (ValueError, "Window is on of 'flat', 'hanning', 'hamming', 'bartlett', 'blackman'")

    s = numpy.r_[x[window_len - 1:0:-1], x, x[-2:-window_len - 1:-1]]
    # print(len(s))
    if window == 'flat':  # moving average
        w = numpy.ones(window_len, 'd')
    else:
        w = eval('numpy.' + window + '(window_len)')

    y = numpy.convolve(w / w.sum(), s, mode='valid')
    return y


def normalize(ecg_signal):
    '''
    Normalize a ECG signal range [0,1]
    :param ecg_signal: pre processed ecg signal
    :return: normalized signal
    '''
    ecg_signal += abs(min(ecg_signal))
    ecg_signal /= max(ecg_signal)

    return ecg_signal


def pre_processing(ecg_signal):
    y_t = butter_bandpass_filter(ecg_signal, 0.05, 100, 1000, order=2)
    signal_de_trend = de_trend(y_t)
    smoothed = smooth(numpy.array(signal_de_trend), window_len=20, window='hamming')[:len(ecg_signal)]
    return normalize(smoothed)
    # return smoothed



def find_r(ecg_signal, md=550):
    '''
    Detect the R peak of a signal distance interval is 550 points
    :param ecg_signal:
    :param md: default 550 indexes
    :return: return R_index, R_magnitude
    '''
    index = indexes(numpy.array(ecg_signal), thres=0.70, min_dist=md)
    value = []
    for v in index:
        value.append(ecg_signal[v])

    return index, value


def get_s(wave):
    '''
    Get the S position of a ECG wave
    :param wave: segmented ECG wave
    :return: index of S and magnitude
    '''
    sort_ = sorted(wave[200:300])
    min_ = sort_[0]
    return wave.index(min_), min_


def get_q(wave):
    '''
    Get the Q position of a ECG wave
    :param wave: segmented ECG wave
    :return: index of Q and magnitude
    '''
    sort_ = sorted(wave[150:200])
    min_ = sort_[0]
    return wave.index(min_), min_


def get_p(wave, q):
    '''
    Get the P position of a ECG wave
    :param wave: segmented ECG wave
    :return: index of P and magnitude
    '''
    sort_ = sorted(wave[q - 100:q])
    max_ = sort_[-1]
    return wave.index(max_), max_


def get_t(wave, s):
    '''
    Get the T position of a ECG wave
    :param wave: segmented ECG wave
    :return: index of T and magnitude
    '''
    sort_ = sorted(wave[s:s + 200])
    max_ = sort_[-1]
    return wave.index(max_), max_

def get_p_q_s_t_index(wave, index_r):
    '''
    From a given wave and a R index get the PQST positions of the signal
    :param wave: segment of the signal
    :param index_r: R peak index
    :return: PQST locations relative to the original signal
    '''
    s_index, _ = get_s(list(wave))
    q_index, _ = get_q(list(wave))
    t_index, _ = get_t(list(wave), s_index)
    p_index, _ = get_p(list(wave), q_index)

    return index_r - (200 - p_index), index_r - (200 - q_index), s_index - 200 + index_r, index_r + (t_index - 200)


def segment_wave(index_r,ecg_signal,left_thr,right_thr):
    '''
    Segment out a PQRST wave from a signal

    :param index_r: R peak index of the signal
    :param ecg_signal: Preprocessed ecg signal
    :param left_thr:  Left cut off value
    :param right_thr: Right cut off value
    :return: a PQRST segment wave

    If a full wave cant be extracted return NULL (in the start of end)

    '''
    if ((index_r-left_thr) < 0) or ((index_r + right_thr) > (len(ecg_signal)-1)):
        return None
    else:
        return ecg_signal[index_r-left_thr:index_r+right_thr]


def read_old(file):
    with open(file, 'r') as FP:
        data = [int(x) for x in FP]
    return data


ecg_signal = read(DATA_DIR+'/S-test-day-01_test_2023-01-03 16_54_38.txt')
ecg_signal_1 = ecg_signal[0:5000]

print(len(ecg_signal_1))

t1=time.time()
pre_pr_ecg = pre_processing(ecg_signal_1)
print ('pre-pr- time = ', time.time()-t1)

# figure(figsize=(10, 5), dpi=100)
# plt.plot(pre_pr_ecg, 'g')
# plt.grid()
# plt.title('Pre-processed ECG signal')
# plt.tight_layout()
# plt.show()


index_r, value = find_r(pre_pr_ecg)
len(index_r)
print(index_r)


index_p = []
index_q = []
index_s = []
index_t = []

rem_from_r = []  # R peaks not containing full wave segment
index_count = 0

for rr_idx in index_r:
    wave = segment_wave(rr_idx, pre_pr_ecg, 200, 300)
    if wave is None:
        rem_from_r.append(index_count)
        print ('Full wave not found')
    else:
        p, q, s, t = get_p_q_s_t_index(wave, rr_idx)
        index_p.append(p)
        index_q.append(q)
        index_s.append(s)
        index_t.append(t)
    index_count += 1

# filter out the non wave segments only for statistical analysis
index_r_filtered = numpy.delete(index_r, rem_from_r)

figure(figsize=(10, 5), dpi=100)
# plt.subplot(313)
plt.plot(pre_pr_ecg, 'g')

plt.plot(index_r_filtered, pre_pr_ecg[index_r_filtered], 'ob', label='R')
plt.plot(index_p, pre_pr_ecg[index_p], 'ro', label='P')
plt.plot(index_q, pre_pr_ecg[index_q], 'ko', label='R')
plt.plot(index_s, pre_pr_ecg[index_s], 'co', label='S')
plt.plot(index_t, pre_pr_ecg[index_t], 'yo', label='T')
plt.grid()
# plt.tight_layout()
plt.show()