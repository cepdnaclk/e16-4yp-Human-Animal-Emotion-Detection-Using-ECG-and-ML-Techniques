import matplotlib.pyplot as plt
from matplotlib.pyplot import figure

DATA_DIR = "sample_data/"

def read(file):
    print("reading ...")
    with open(file, 'r') as FP:
        data = [int(x) for x in FP]
    return data

ecg_signal = read(DATA_DIR+'/sample_data.txt')

print(len(ecg_signal))

figure(figsize=(10, 5), dpi=100)
plt.plot(ecg_signal, 'b')
plt.grid()
plt.title('Original ECG signal')
plt.tight_layout()
plt.show()

