import pandas as pd
import numpy as np

from tts import tts, tts_dialog

def text_is_dialog(text:str):
    return text.startswith("A") or text.startswith("B")

def add_tts(df, master_df):
    ttsed_sentences = set(master_df["Japanese"])
    master_df.index = master_df["Japanese"]
    append_rows = []
    for index, row in df.iterrows():
        japanese_sentence = row['Japanese']
        try:
            japanese_sentence = str(int(japanese_sentence))
        except:
            pass
        if japanese_sentence not in ttsed_sentences:
            
            if text_is_dialog(japanese_sentence):
                # print(f"ttsing dialog {japanese_sentence}...")
                tts_file = tts_dialog(japanese_sentence)
            else:   
                print(f"ttsing {japanese_sentence}...")
                tts_file = tts(row['Japanese'])
            if not tts_file:
                # print(f"tts failed for {japanese_sentence}")
                continue
            row["tts_file"] = tts_file
            append_rows.append(row)
    
    if append_rows:
        print(f"appending {len(append_rows)} rows to master df...")
        append_df = pd.DataFrame(append_rows)
        master_df = pd.concat([master_df, append_df])    
    return master_df

def add_english_texts_to_master_df(df, master_df):
    master_df.index = master_df["Japanese"] 
    df.index = df["Japanese"]
    for index, row in df.iterrows():
        english_translation_new_df = row['English']
        try:
            english_translation_master_df = master_df.loc[index, "English"]
            if len(english_translation_master_df) > 1:
                english_translation_master_df = english_translation_master_df[0]
        except KeyError:
            # print(f"KeyError for {index}")
            continue
        if pd.isna(english_translation_master_df) and not pd.isna(english_translation_new_df):
            print("Adding new english text to master df...")
            master_df.loc[index, "English"] = row["English"]
    return master_df
    

def digest_df(df_path, master_df_path):
    master_df = pd.read_csv(master_df_path, index_col=False)
    master_df_before = master_df.copy()
    df = pd.read_csv(df_path)
    master_df = add_tts(df, master_df)
    master_df = add_english_texts_to_master_df(df, master_df)
    master_df.reset_index(drop=True, inplace=True)
    master_df_before.reset_index(drop=True, inplace=True)

    if not master_df.equals(master_df_before):
        print(f"saving master df at {master_df_path}...")
        master_df.to_csv(master_df_path, index=False)
    else:
        print("no changes to master df")


if __name__ == "__main__":
    master_df_path = "./master_df.csv"
    # digest_df("input_sentences/genki.csv", master_df_path)
    # digest_df("input_sentences/simple_dialog.csv", master_df_path)
    # digest_df("input_sentences/numbers.csv", master_df_path)
    digest_df("input_sentences/times_translated.csv", master_df_path)

