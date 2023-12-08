"""Synthesizes speech from the input string of text or ssml.
Make sure to be working in a virtual environment.

Note: ssml must be well-formed according to:
    https://www.w3.org/TR/speech-synthesis/
"""
from google.cloud import texttospeech
import random
# load the credentials json into the corresponding environment variable
import os
import re
from pydub import AudioSegment
from io import BytesIO


import uuid
uuid.uuid4().hex

def tts(text:str, out_folder="./samples"):
    id = uuid.uuid4().hex
    client, japanese_voices,_,_ = get_client_and_voices()
    voice_name = random.choice(japanese_voices)
    response = do_tts(client, text, voice_name)
    outfile = os.path.join(out_folder, f"out_{id}.mp3")
    bytes_to_file(response.audio_content, outfile)
    return outfile

def do_tts(client, text:str, voice_name)->bytes:
    print(f"Doing tts for text: {text}...")
    synthesis_input = texttospeech.SynthesisInput(text=text)
    voice = texttospeech.VoiceSelectionParams(language_code="ja-JP", name=voice_name)
    audio_config = texttospeech.AudioConfig(audio_encoding=texttospeech.AudioEncoding.MP3)
    response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)
    return response

def bytes_to_file(b:bytes, outfile:str):
    with open(outfile, "wb") as out:
        out.write(b)
        print(f'Audio content for sentence written to file {outfile}')

def get_client_and_voices():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./secrets/vaulted-bus-406720-44b03c9092c5.json"
    client = texttospeech.TextToSpeechClient()
    japanese_voices = client.list_voices(language_code="ja-JP").voices
    japanese_voices = [voice for voice in japanese_voices if "Wave" in voice.name]
    female_voices = [voice.name for voice in japanese_voices if voice.ssml_gender == 2]
    male_voices = [voice.name for voice in japanese_voices if voice.ssml_gender == 1]
    japanese_voices = [voice.name for voice in japanese_voices]
    return client, japanese_voices, female_voices, male_voices


def tts_dialog(dialog_text: str, out_folder="./samples"):
    print(f"Doing tts for dialog: {dialog_text}...")
    id = uuid.uuid4().hex
    outfile = os.path.join(out_folder, f"out_{id}.mp3")
    client, _, female_voices, male_voices = get_client_and_voices()
    random.shuffle(female_voices)
    random.shuffle(male_voices)
    possible_genders = ["M", "F"]
    dialog_lines = dialog_text.split("￥")
    speaker_re_pattern = "(?P<speaker>[AB]) ?\(?(?P<gender>[MF])?\)?:(?P<line>.*)"

    speaker_voice_dict = dict()
    dialog_line_reponses = []
    for dialog_line in dialog_lines:
        match_line = re.findall(speaker_re_pattern, dialog_line)
        if not match_line:
            raise ValueError(f"dialog line {dialog_line} does not match pattern {speaker_re_pattern}")
        if len(match_line) > 1:
            raise ValueError(f"dialog line {dialog_line} matches more than one speaker")
        speaker = match_line[0][0]
        gender = match_line[0][1]
        line_text = match_line[0][2]
        if speaker not in speaker_voice_dict.keys():
            # assign a random voice if speaker is not yet in the dict.
            gender = gender if gender else random.choice(possible_genders)
            voice = random.choice(female_voices) if gender == "F" else random.choice(male_voices)
            speaker_voice_dict[speaker] = voice
        voice = speaker_voice_dict[speaker]
        response = do_tts(client, line_text, voice)
        dialog_line_reponses.append(response)
    dialog_line_bytes = [response.audio_content for response in dialog_line_reponses]
    # combine the bytes
    # Convert binary MP3 data to AudioSegment objects
    audio_segments = [AudioSegment.from_file(BytesIO(binary_data), format="mp3") for binary_data in dialog_line_bytes]
    # Delay duration in milliseconds
    delay_duration = 500  # 0.5 seconds

    # Create a silent segment for the delay
    silent_segment = AudioSegment.silent(duration=delay_duration)
    # Combine audio segments with delays
    combined_segment = audio_segments[0]
    for segment in audio_segments[1:]:
        combined_segment += silent_segment + segment
    # Export the combined audio
    print(f"Writing combined audio to {outfile}...")
    combined_segment.export(outfile, format="mp3")
    return outfile

