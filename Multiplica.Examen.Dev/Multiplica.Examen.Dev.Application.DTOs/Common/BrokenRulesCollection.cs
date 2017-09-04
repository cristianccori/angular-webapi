using System;
using System.Collections.Generic;
using System.Linq;

namespace Multiplica.Examen.Dev.Application.DTOs.Common
{
    [Serializable]
    public class BrokenRulesCollection : List<BrokenRule>
    {
        private readonly object _syncRoot = new object();

        public int ErrorCount { get; private set; }

        public int WarningCount { get; private set; }

        public int InformationCount { get; private set; }

        public BrokenRulesCollection(IEnumerable<BrokenRule> brokenRules) : base(brokenRules)
        {
        }

        public BrokenRulesCollection()
        {
        }

        private void ClearRules()
        {
            lock (_syncRoot)
            {
                Clear();
            }
        }

        public void AddItem(BrokenRule broken)
        {
            Add(broken);
        }
    }
}
