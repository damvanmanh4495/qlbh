import React from 'react';
import { Switch } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./modules/Products/ProductsPage";
import ProductFormPage from './modules/Products/ProductFormPage';
import ProductVariantFormPage from './modules/Products/variants/ProductVariantFormPage';
import ListOrderPage from './modules/OrdersManagement/ListOrderPage';
import SalePage from './modules/Sale/SalePage';
import CategoriesPage from './modules/Categories/CategoriesPage'
import Setting from './modules/Settings/Setting';
import Customers from './modules/Customers/CustomerList';
import AddCustomer from './modules/Customers/AddCustomer';
import OrderDetailPage from './modules/OrdersManagement/OrderDetail';
import ListOrderReturnPage from './modules/OrdersManagement/ListOrderReturnPage';
import OrderReturnPage from './modules/OrdersManagement/components/OrderReturnPage';
import EmployeesPage from './modules/Employees/EmployeesPage';
import EmployeeFormPage from './modules/Employees/EmployeeFormPage';
import PermissionPage from './modules/Permission/PermissionPage';
import PermissionFormPage from './modules/Permission/PermissionFormPage';
import CustomerForm from './modules/Customers/customer-form/CustomerForm';
import CustomerDetailPage from './modules/Customers/CustomerDetailPage';

const Router: React.FC = () => {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={DashboardPage} />
            <PublicRoute exact path="/login" component={LoginPage} />

            <PrivateRoute exact path="/categories" component={CategoriesPage} />

            <PrivateRoute exact path="/products" component={ProductsPage} />
            <PrivateRoute exact path="/products/create" component={ProductFormPage} />
            <PrivateRoute exact path="/products/:id/variants/create" component={ProductVariantFormPage} />
            <PrivateRoute exact path="/products/:id/variants/:variantId" component={ProductVariantFormPage} />
            <PrivateRoute exact path="/products/:id" component={ProductFormPage} />

            <PrivateRoute exact path="/orders" component={ListOrderPage} />
            <PrivateRoute exact path="/orders/returns" component={ListOrderReturnPage} />
            <PrivateRoute exact path="/orders/:id" component={OrderDetailPage} />
            <PrivateRoute exact path="/orders/returns/:id" component={()=> <OrderReturnPage type="detail"/>}/>
            <PrivateRoute exact path="/orders/:id/returns/create" component={()=> <OrderReturnPage type="create"/>} />

            <PrivateRoute exact path="/sale" component={SalePage} />
            <PrivateRoute exact path="/settings" component={Setting} />

            <PrivateRoute exact path="/employees" component={EmployeesPage} />
            <PrivateRoute exact path="/employees/create" component={EmployeeFormPage} />
            <PrivateRoute exact path="/employees/:id" component={EmployeeFormPage} />

            <PrivateRoute exact path="/permission" component={PermissionPage} />
            <PrivateRoute exact path="/permission/create" component={PermissionFormPage} />
            <PrivateRoute exact path="/permission/:id" component={PermissionFormPage} />

            <PrivateRoute exact path="/customers" component={Customers} />
            <PrivateRoute exact path="/customers/create" component={CustomerForm} />
            <PrivateRoute exact path="/customers/edit/:id" component={() => <CustomerForm type="edit"/>} />
            <PrivateRoute exact path="/customers/:id" component={CustomerDetailPage} />
        </Switch >
    );
};

export default Router;