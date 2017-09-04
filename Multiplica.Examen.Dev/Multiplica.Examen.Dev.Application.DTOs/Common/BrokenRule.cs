﻿namespace Multiplica.Examen.Dev.Application.DTOs.Common
{
    public class BrokenRule
    {
        public string RuleName { get; set; }

        public string Description { get; set; }

        public string Property { get; set; }

        public RuleSeverity Severity { get; set; }

        public override string ToString()
        {
            return Description;
        }
    }
}
