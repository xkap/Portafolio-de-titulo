using MantenedoresSigloXXI.Contracts.Services;
using MantenedoresSigloXXI.Contracts.ViewModels;
using MantenedoresSigloXXI.Controllers;
using MantenedoresSigloXXI.Helpers;
using MantenedoresSigloXXI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Navigation;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Collections.ObjectModel;

namespace MantenedoresSigloXXI.ViewModels
{
    public class CTableUpdateViewModel : Observable, INavigationAware
    {
        private readonly INavigationService _navigationService;
        public ObservableCollection<Waiter> Waiters { get; private set; } = new ObservableCollection<Waiter>();
        private ICommand _editCTable;
        private ICommand _deleteCTable;

        public ICommand EditCTable => _editCTable ?? (_editCTable = new RelayCommand(OnEditCTable));
        public ICommand DeleteCTable => _deleteCTable ?? (_deleteCTable = new RelayCommand(OnDeleteCTable));
        // Product _updatingProduct;
        //Observable name = new Observable();
        private CTable originalCTable;
        private CTable updatingCTable;
        public CTable UpdatingCTable
        {
            get { return updatingCTable; }
            set
            {
                if (updatingCTable != value)
                {
                    updatingCTable = value;
                    OnPropertyChanged("UpdatingCTable");
                }
            }
        }

        internal void setWaiterId(object selectedItem)
        {
            Waiter w = (Waiter)selectedItem;
            updatingCTable.WaiterId = w.Id.ToString();
        }



        public CTableUpdateViewModel(INavigationService navigationService)
        {
            _navigationService = navigationService;
        }

        private void OnDeleteCTable()
        {
            if(UpdatingCTable != null)
            {
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxDeleteCTable, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:
                        int r = CTableController.DeleteCTable(UpdatingCTable);
                        if (r == 201)
                        {


                            MessageBox.Show(Properties.Resources.CTableDeleted, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                        }
                        else
                        {
                            MessageBox.Show(Properties.Resources.ErrorMsg, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);


                        }
                        Back();
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

        private void OnEditCTable()
        {
            if(IsValid())
            { 
                MessageBoxResult result = MessageBox.Show(Properties.Resources.WarningMsgBoxEdit, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OKCancel);
                switch (result)
                {
                    case MessageBoxResult.OK:

                        int r =CTableController.EditCTable(UpdatingCTable);
                        if (r == 201)
                        {
                            MessageBox.Show(Properties.Resources.CTableUpdated, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                        }
                        else
                        {
                            MessageBox.Show(Properties.Resources.ErrorMsg, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);


                        }
                        Back();
                        break;
                    case MessageBoxResult.Cancel:
                        break;

                }
            }

        }
        
        public bool IsValid() {
            /*
            if (originalCTable.Name == updatingProduct.Name &&
                originalProduct.Quantity == updatingProduct.Quantity)
            {
                Debug.WriteLine("son iguales");
                Back();
                return false;
            }       
                
            if (!Regex.IsMatch(updatingProduct.Quantity.ToString(), @"^[0-9]\d{0,5}$"))
            {
                MessageBox.Show(Properties.Resources.WarningMsgBoxInvalidQuantity, Properties.Resources.WarningMsgBoxTitle, MessageBoxButton.OK);
                return false;
            }
        */
            return true;
        }
        
        public void OnNavigatedFrom()
        {
            
        }

        public void OnNavigatedTo(object sender)
        {
            foreach (var waiter in WaiterController.GetWaiters())
            {
                Waiters.Add(waiter);
            }

            UpdatingCTable = (CTable)sender;
            originalCTable = new CTable
            {
                Capacity = UpdatingCTable.Capacity,
                WaiterId = UpdatingCTable.WaiterId,
                CustomerId = UpdatingCTable.CustomerId,
            };

        }


        public void Back()
        {
            _navigationService.GoBack();
        }
    }
}
