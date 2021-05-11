using System;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.Linq;
using System.Windows;
using System.Windows.Input;
using MantenedoresSigloXXI.Contracts.ViewModels;
using MantenedoresSigloXXI.Controllers;
using MantenedoresSigloXXI.Core.Contracts.Services;
using MantenedoresSigloXXI.Core.Models;
using MantenedoresSigloXXI.Helpers;
using MantenedoresSigloXXI.Models;

namespace MantenedoresSigloXXI.ViewModels
{
    public class OtrosViewModel : Observable, INavigationAware
    {

        private RestockOrder _selected;
        private readonly ISampleDataService _sampleDataService;

        public RestockOrder Selected
        {
            get { return _selected; }
            set { Set(ref _selected, value); }
        }

        public ObservableCollection<RestockOrder> Orders { get; private set; } = new ObservableCollection<RestockOrder>();
        public ObservableCollection<RestockProduct> RequiredProducts { get; private set; } = new ObservableCollection<RestockProduct>();

        private ICommand _rejectOrder;
        private ICommand _approveOrder;

        public ICommand ApproveOrder => _approveOrder ?? (_approveOrder = new RelayCommand(OnApproveOrder));
        public ICommand RejectOrder => _rejectOrder ?? (_rejectOrder = new RelayCommand(OnRejectOrder));

        private void OnRejectOrder()
        {
            if (Selected != null)
            {
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxDeleteOrder, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:
                        int r = RestockOrderController.RejectOrder(Selected);
                        if (r == 201)
                        {

                            Orders.Remove(Selected);
                            Selected = Orders.FirstOrDefault();
                            MessageBox.Show(Properties.Resources.OrderRejected, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                        }
                        else
                        {
                            MessageBox.Show(Properties.Resources.ErrorMsg, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);


                        }
                        
                        break;
                    case MessageBoxResult.Cancel:
                        break;

                }
            }
            else
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxChooseOneProduct, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
            }



        }



        private void OnApproveOrder()
        {

                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxApprove, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:

                        int r = RestockOrderController.ApproveOrder(Selected);
                        if (r == 201)
                        {
                            Orders.Remove(Selected);
                            Selected = Orders.FirstOrDefault();
                            MessageBox.Show(Properties.Resources.OrderApproved, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);

                        }
                        else
                        {
                            MessageBox.Show(Properties.Resources.ErrorMsg, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);


                        }

                        break;
                    case MessageBoxResult.Cancel:
                        break;

                }
  

        }
        public OtrosViewModel(ISampleDataService sampleDataService)
        {
            _sampleDataService = sampleDataService;
        }

        public async void OnNavigatedTo(object parameter)
        {
            Orders.Clear();

            var data = await RestockOrderController.GetRestockOrdersJSON();
            Console.Out.WriteLine(data);
            foreach (var item in data)
            {
                Orders.Add(item);
            }

                Selected = Orders.FirstOrDefault();
 
        }

        public void PopulateProducts(object e)
        {
            RequiredProducts.Clear();
            RestockOrder ro = new RestockOrder();
            ro = (RestockOrder)e;
            
            foreach (var item in ro.RequiredProducts)
            {
                RequiredProducts.Add(item);
            }
            
            Console.Out.Write("help");
            return;
        }

        public void OnNavigatedFrom()
        {
        }
    }
}
