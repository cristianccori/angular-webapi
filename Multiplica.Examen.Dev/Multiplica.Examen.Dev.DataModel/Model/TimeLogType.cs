using Multiplica.Examen.Dev.DataBase;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Multiplica.Examen.Dev.DataModel
{
    public class TimeLogType : IEntity
    {
        [Autoincrement]
        public int Id { get; set; }

        [Index("IX_TimeLogType_Type")]
        [Required]
        public string Type { get; set; }

        [Required]
        public decimal Budget { get; set; }
    }
}
