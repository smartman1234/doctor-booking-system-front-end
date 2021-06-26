import { BrowserRouter, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './components/Home';
import Register from './components/auth/Register';
import Nav from './components/navbar/Nav';
import Navbar from './components/navbar/Navbar';
import { useEffect, useState } from 'react';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/Reset';
import Profile from './components/Profile/Profile';
import HomeSite from './components/patient/HomeSite';
import ProtectedRoute from './components/ProtectedRoute';
import Card from './components/DoctorCard/Card';
import SearchBar from './components/searchbar/SearchBar';
import MainHome from './components/HomeTest/MainHome';
import MyAppointments from './components/patient/MyAppointments';


export {
    BrowserRouter,
    Route,
    useEffect,
    useState,
    Login,
    Home,
    Register,
    Nav,
    Navbar,
    Forgot,
    Reset,
    Profile,
    HomeSite,
    Card,
    ProtectedRoute,
    MainHome,
    SearchBar,
    MyAppointments
}