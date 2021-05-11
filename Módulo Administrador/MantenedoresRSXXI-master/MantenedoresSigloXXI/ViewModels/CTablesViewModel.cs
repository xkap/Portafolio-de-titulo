using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Input;
using MantenedoresSigloXXI.Contracts.Services;
using MantenedoresSigloXXI.Contracts.ViewModels;
using MantenedoresSigloXXI.Controllers;
using MantenedoresSigloXXI.Core.Contracts.Services;
using MantenedoresSigloXXI.Core.Models;
using MantenedoresSigloXXI.Helpers;
using MantenedoresSigloXXI.Models;

namespace MantenedoresSigloXXI.ViewModels
{
    public class CTablesViewModel :  BaseViewModel
    {
        
        private CTable _selected;
        public List<CTable> CTables;

        private ICommand _ctableUpdateCommand;
        private ICommand _newCTableCommand;
        private void OnCTableUpdateInvoked()
        {
            if (_selected != null)
            {
                NavigateTo(typeof(CTableUpdateViewModel), _selected);
            }
            else
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxChooseOneTable, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
            }
        }

        private void OnNewCTableInvoked()
        {

            NavigateTo(typeof(NewCTableViewModel));

        }

        public ICommand CTableUpdateCommand => _ctableUpdateCommand ?? (_ctableUpdateCommand = new RelayCommand(OnCTableUpdateInvoked));
        public ICommand NewCTableCommand => _newCTableCommand ?? (_newCTableCommand = new RelayCommand(OnNewCTableInvoked));

        public CTable Selected
        {
            get { return _selected; }
            set { Set(ref _selected, value); }
        }

        private ObservableCollection<CTable> listOfCTables;

        public CTablesViewModel(INavigationService navigationService)
        {
            
            _navigationService = navigationService;
            Initialize();
        }

        public ObservableCollection<CTable> ListOfCTables
        {
            get { return listOfCTables; }
            set
            {
                if (listOfCTables != value)
                {
                    listOfCTables = value;
                    OnPropertyChanged("ListOfCTables");
                }
            }
        }


        private void Initialize()
        {
            CTables = new List<CTable>();
            ListOfCTables = new ObservableCollection<CTable>();
            //UpdateCustomerList();

            //Customers = CustomerController.DeserializeCustomers();
        }

        public void UpdateCTablesList()
        {
            if(CTables.Count > 0)
                CTables.Clear();
            if(ListOfCTables.Count > 0)
                ListOfCTables.Clear();
            CTableController.GetCTablesJSON();

            CTables = CTableController.GetCTablesList();
            ListOfCTables = new ObservableCollection<CTable>(CTables);
            //Customers = CustomerController.DeserializeCustomers();
        }

  

        public void FilterById(string filterBy)
        {
            ListOfCTables.Clear();

            foreach (CTable ct in CTables)
            {
                if (ct.Id.ToString() == filterBy || filterBy.Length == 0)
                {
                    ListOfCTables.Add(ct);
                }
            }

        }

        public override void OnNavigatedTo(object parameter)
        {
            UpdateCTablesList();
        }

        public override void OnNavigatedFrom()
        {
            
        }
    }
}
