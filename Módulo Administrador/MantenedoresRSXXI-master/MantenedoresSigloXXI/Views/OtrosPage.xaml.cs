using System.Windows.Controls;

using MantenedoresSigloXXI.ViewModels;

namespace MantenedoresSigloXXI.Views
{
    public partial class OtrosPage : Page
    {
        public OtrosPage(OtrosViewModel viewModel)
        {
            InitializeComponent();
            DataContext = viewModel;
        }

        private void ListView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var v = (OtrosViewModel)DataContext;
            if(e.AddedItems.Count==1)
                v.PopulateProducts( e.AddedItems[0]);
        }
    }
}
