import matplotlib.pyplot as plt
from matplotlib.pyplot import figure
from scipy.signal import butter, lfilter
from scipy import signal
import numpy
import time

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


ecg_signal = read(DATA_DIR+'/sample_data_2022-12-06 14_14_57.txt')

print(len(ecg_signal))

t1=time.time()
pre_pr_ecg = pre_processing(ecg_signal)
print ('pre-pr- time = ',time.time()-t1)

figure(figsize=(10, 5), dpi=100)
plt.plot(pre_pr_ecg, 'g')
plt.grid()
plt.title('Preprocessed ECG signal')
plt.tight_layout()
plt.show()