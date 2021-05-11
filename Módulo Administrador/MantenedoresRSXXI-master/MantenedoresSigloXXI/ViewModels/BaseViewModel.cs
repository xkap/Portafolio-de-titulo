using MantenedoresSigloXXI.Contracts.Services;
using MantenedoresSigloXXI.Contracts.ViewModels;
using MantenedoresSigloXXI.Helpers;
using MantenedoresSigloXXI.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;

namespace MantenedoresSigloXXI.ViewModels
{
    public abstract class BaseViewModel : Observable, INavigationAware
    {
        protected INavigationService _navigationService;

        public  BaseViewModel()
        {

        }

        public void NavigateTo(Type targetViewModel)
        {
            if (targetViewModel != null)
            {
                _navigationService.NavigateTo(targetViewModel.FullName);
            }
        }

        public void NavigateTo(Type targetViewModel, Object o)
        {
            if (targetViewModel != null)
            {
                _navigationService.NavigateTo(targetViewModel.FullName,o);
            }
        }

        public void Back()
        {
            _navigationService.GoBack();
        }

        public abstract void OnNavigatedTo(object parameter);

        public abstract void OnNavigatedFrom();

    }
}
