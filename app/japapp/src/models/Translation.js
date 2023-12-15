class Translation{
    constructor(response){
      this.id = response.id;
      this.japanese = response.Japanese;
      this.english = response.English;
      this.tts_file = response.tts_file;
      this.chapter = response.chapter;
    }
  }

export default Translation;