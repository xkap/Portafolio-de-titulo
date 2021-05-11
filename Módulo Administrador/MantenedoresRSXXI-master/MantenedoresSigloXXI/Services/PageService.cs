﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Controls;

using MantenedoresSigloXXI.Contracts.Services;
using MantenedoresSigloXXI.Helpers;
using MantenedoresSigloXXI.ViewModels;
using MantenedoresSigloXXI.Views;

namespace MantenedoresSigloXXI.Services
{
    public class PageService : IPageService
    {
        private readonly Dictionary<string, Type> _pages = new Dictionary<string, Type>();
        private readonly IServiceProvider _serviceProvider;

        public PageService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            Configure<MainViewModel, MainPage>();
            Configure<CustomersViewModel, CustomersPage>();
            Configure<ProductsViewModel, ProductsPage>();
            Configure<OtrosViewModel, OtrosPage>();
            Configure<SettingsViewModel, SettingsPage>();
            Configure<CustomerUpdateViewModel, CustomerUpdatePage>();
            Configure<ProductUpdateViewModel, ProductUpdatePage>();
            Configure<NewProductViewModel, NewProductPage>();
            Configure<CTablesViewModel, CTablesPage>();
            Configure<NewCTableViewModel, NewCTablePage>();
            Configure<CTableUpdateViewModel, CTableUpdatePage>();
            Configure<MonthlyViewModel, MonthlyPage>();
        }

        public Type GetPageType(string key)
        {
            Type pageType;
            lock (_pages)
            {
                if (!_pages.TryGetValue(key, out pageType))
                {
                    throw new ArgumentException($"Page not found: {key}. Did you forget to call PageService.Configure?");
                }
            }

            return pageType;
        }

        public Page GetPage(string key)
        {
            var pageType = GetPageType(key);
            return _serviceProvider.GetService(pageType) as Page;
        }

        private void Configure<VM, V>()
            where VM : Observable
            where V : Page
        {
            lock (_pages)
            {
                var key = typeof(VM).FullName;
                if (_pages.ContainsKey(key))
                {
                    throw new ArgumentException($"The key {key} is already configured in PageService");
                }

                var type = typeof(V);
                if (_pages.Any(p => p.Value == type))
                {
                    throw new ArgumentException($"This type is already configured with key {_pages.First(p => p.Value == type).Key}");
                }

                _pages.Add(key, type);
            }
        }
    }
}
