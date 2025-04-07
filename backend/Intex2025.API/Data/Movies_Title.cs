using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Intex2025.API.Data
{
    public class Movies_Title
    {
        [Key]
        public string? show_id { get; set; }
        public string? type { get; set; }
        public string? title { get; set; }
        public string? director { get; set; }
        public string? cast { get; set; }
        public string? country { get; set; }
        public int? release_year { get; set; }
        public string? rating { get; set; }
        public string? duration { get; set; }
        public string? description { get; set; }
        public int? Action { get; set; }
        public int? Adventure { get; set; }

        [Column("Anime Series International TV Shows")]
        public int? Anime { get; set; }

        [Column("British TV Shows Docuseries International TV Shows")]
        public int? British { get; set; }

        public int? Children { get; set; }
        public int? Comedies { get; set; }

        [Column("Comedies Dramas International Movies")]
        public int? Comedies_Drama { get; set; }

        [Column("Comedies International Movies")]
        public int? Comedies_International { get; set; }

        [Column("Comedies Romantic Movies")]
        public int? Comedies_Romantic { get; set; }

        [Column("Crime TV Shows Docuseries")]
        public int? Crime { get; set; }

        public int? Documentaries { get; set; }

        [Column("Documentaries International Movies")]
        public int? Documentaries_International { get; set; }

        public int? Docuseries { get; set; }
        public int? Dramas { get; set; }

        [Column("Dramas International Movies")]
        public int? Dramas_International { get; set; }

        [Column("Dramas Romantic Movies")]
        public int? Dramas_Romantic { get; set; }

        [Column("Family Movies")]
        public int? Family { get; set; }

        public int? Fantasy { get; set; }

        [Column("Horror Movies")]
        public int? Horror { get; set; }

        [Column("International Movies Thrillers")]
        public int? Thrillers_International { get; set; }

        [Column("International TV Shows Romantic TV Shows TV Dramas")]
        public int? Romantic_Dramas_International { get; set; }

        [Column("Kids' TV")]
        public int? Kids { get; set; }

        [Column("Language TV Shows")]
        public int? Language { get; set; }

        public int? Musicals { get; set; }

        [Column("Nature TV")]
        public int? Nature { get; set; }

        [Column("Reality TV")]
        public int? Reality { get; set; }

        public int? Spirituality { get; set; }

        [Column("TV Action")]
        public int? TV_Action { get; set; }

        [Column("TV Comedies")]
        public int? TV_Comedies { get; set; }

        [Column("TV Dramas")]
        public int? TV_Dramas { get; set; }

        [Column("Talk Shows TV Comedies")]
        public int? Talk_Shows { get; set; }

        public int? Thrillers { get; set; }
    }
}
