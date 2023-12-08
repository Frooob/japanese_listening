from random import randrange
import pandas as pd


columns = ["Japanese", "English", "tts_file"]

df_data = []
number_of_numbers = 10
for i in range(number_of_numbers):
    number = randrange(999)
    df_data.append({"Japanese": str(number), "English": str(number), "tts_file": ""})
for i in range(number_of_numbers):
    number = randrange(1000,9999)
    df_data.append({"Japanese": str(number), "English": str(number), "tts_file": ""})
for i in range(number_of_numbers):
    number = randrange(10000,99999)
    df_data.append({"Japanese": str(number), "English": str(number), "tts_file": ""})

df = pd.DataFrame(df_data, columns=columns)

df.to_csv("./input_sentences/numbers.csv", index=False)
