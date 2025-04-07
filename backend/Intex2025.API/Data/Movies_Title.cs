namespace Intex2025.API.Data
{
    public class Movies_Title
    {
        [Key]
        public string show_id { get; set; }
        public string type { get; set; }
        public string title { get; set; }
        public string director { get; set; }
        public string cast { get; set; }
        public string country { get; set; }
        public int release_year { get; set; }
        public string rating { get; set; }
        public string duration { get; set; }
        public string description { get; set; }
        public int Action { get; set; }
        public int Adventure { get; set; }
        public int Anime Series International TV Shows { get; set; }

    }
}
