using System.Collections.Generic;
using System.Threading.Tasks;

using MantenedoresSigloXXI.Core.Models;

namespace MantenedoresSigloXXI.Core.Contracts.Services
{
    public interface ISampleDataService
    {
        Task<IEnumerable<SampleOrder>> GetMasterDetailDataAsync();
    }
}
