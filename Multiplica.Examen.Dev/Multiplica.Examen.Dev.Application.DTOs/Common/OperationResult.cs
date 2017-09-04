using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Multiplica.Examen.Dev.Application.DTOs.Common
{
    public class OperationResult
    {
        public bool IsValid => BrokenRulesCollection.All(r => r.Severity != RuleSeverity.Error);
        public BrokenRulesCollection BrokenRulesCollection { get; set; } = new BrokenRulesCollection();
    }

    public enum RuleSeverity
    {
        Error = 0,
        Warning = 1,
        Information = 2,
        Success = 3
    }
}
