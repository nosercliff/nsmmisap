import Login from "./components/Login/Login";
import ChangePassword from "./components/Login/ChangePassword";
import Home from "./components/HomePage/Home";
import Banner from "./components/Nav/Banner";

import Unathorized from './unauthorized'
import React, {Component} from 'react';
import {ProtectedRoute} from './protected.route'
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// START TIMEKEEPING
/*
import WorkSchedule from "./components/Timekeeping/WorkSchedule/WorkSchedule";
import WorkScheduleCreate from "./components/Timekeeping/WorkSchedule/WorkScheduleCreate";
import EmployeeConfig from "./components/Maintenance/EmployeeConfig";
import ListOfEmployeeConfig from "./components/Maintenance/EmployeeConfigExport";
import City from "./components/Maintenance/City";
import CityCreate from "./components/Maintenance/CityCreate";
import Holiday from './components/Holiday/Holiday';
import HolidayCreate from "./components/Holiday/HolidayCreate";
import Province from "./components/Maintenance/Province";
import ProvinceCreate from './components/Maintenance/ProvinceCreate';
import Region from './components/Maintenance/Region';
import RegionCreate from './components/Maintenance/RegionCreate';
import Breaktime from './components/Maintenance/Breaktime';
import BreaktimeCreate from './components/Maintenance/BreaktimeCreate';
import Modal from './components/Maintenance/Modal';
import ChangeWorkSched from './components/Maintenance/ChangeWorkSched';
import RateCard from './components/Maintenance/RateCard';
import RateCardCreate from './components/Maintenance/RateCardCreate';
import RateCardConfig from './components/Timekeeping/RateCard/RateCardConfig';
import DailyTimeRecord from './components/DailyTimeRecord/DailyTimeRecord';
import Location from "./components/Maintenance/Location";
import LocationCreate from './components/Maintenance/LocationCreate';
import ClientConfig from './components/Maintenance/ClientConfig';
import BootStrapGrid1 from './components/ProofOfConcept/BootStrapGrid1';
import LeaveModal from './components/Maintenance/LeaveModal';
import BillableHours from './components/Timekeeping/BillableHours/BillableHours';
import ComputedDTR from './components/Maintenance/ComputedDTR';
import GenerateDTR from './components/Timekeeping/GeneratedDTR/GenerateDTR';
import GenerateWorkSchedule from './components/Timekeeping/EmployeeWorkSchedule/GenerateWorkSchedule';
import DTRStatusMonitoring from './components/Timekeeping/DTRMonitoring/DTRStatusMonitoring';
*/
// END TIMEKEEPING

// START PAYROLL
/*
import PayrollConfiguration from './components/Payroll/PayrollConfiguration';
import InclusionLedger from './components/Payroll/InclusionLedger';
import DeductionLedger from './components/Payroll/DeductionLedger';
import DeductionType from './components/Maintenance/DeductionType';
import DeductionTypeCreate from './components/Maintenance/DeductionTypeCreate';
import Deduction from './components/Maintenance/Deduction';
import DeductionCreate from './components/Maintenance/DeductionCreate';
import InclusionType from './components/Maintenance/InclusionType';
import InclusionTypeCreate from './components/Maintenance/InclusionTypeCreate';
import Inclusion from './components/Maintenance/Inclusion';
import InclusionCreate from './components/Maintenance/InclusionCreate';
import SSSContributionModal from './components/Payroll/SSSContributionModal';
import PHICModal from './components/Payroll/PHICModal';
import SSSLoanModal from './components/Payroll/SSSLoanModal';
import PagibigLoanModal from './components/Payroll/PagibigLoanModal';
import HDMFContributionModal from './components/Payroll/HDMFContributionModal';
import GeneratePayroll from './components/Payroll/GeneratePayroll';
import PayrollSSSLoanDeduction from './components/Payroll/PayrollSSSLoanDeduction';
import SSSTable from './components/Maintenance/SSSTable';
import PhilHealthTable from './components/Maintenance/PhilHealthTable';
import PagibigTable from './components/Maintenance/PagibigTable';
import PayrollInclusions from './components/Payroll/PayrollInclusions';
import PayrollDeductions from './components/Payroll/PayrollDeductions';
import PayrollLoans from './components/Payroll/PayrollLoans';
import PayrollInclusionMenu from './components/Payroll/PayrollInclusionMenu';
import PayrollLoanTypes from './components/Payroll/PayrollLoanTypes';
import PayrollLoanTypesCreate from './components/Payroll/PayrollLoanTypesCreate';
import LoanType from './components/Maintenance/LoanType';
import LoanTypeCreate from './components/Maintenance/LoanTypeCreate';
import PayrollLoanAdjustments from './components/Payroll/PayrollLoanAdjustments';
import PayrollDeductionAdjustments from './components/Payroll/PayrollDeductionAdjustments';
import PayrollContributionAdjustments from './components/Payroll/PayrollContributionAdjustments';
*/

/* import GeneratePayrollFile from './components/Payroll/GeneratePayrollFile'; */
/* import PayrollGenerate from './components/Test/PayrollGenerate'; */

/*
import ReportPayrollSummary from './components/Payroll/ReportPayrollSummary';
import ReportGovernmentMandatory from './components/Payroll/ReportGovernmentMandatory';
import ReportLoanType from './components/Payroll/ReportLoanType';
import ReportDeductionType from './components/Payroll/ReportDeductionType';
*/
// END PAYROLL

// START BILLING
/*
import BillingConfiguration from './components/Billing/BillingConfiguration';
import BillingScreen from './components/Billing/BillingScreen';
*/


/* import BillingTemplate from './components/Maintenance/BillingTemplate';
import BillingTemplateCreate from './components/Maintenance/BillingTemplateCreate';
import PayrollFields from './components/Maintenance/PayrollFields';
import PayrollFieldsCreate from './components/Maintenance/PayrollFieldsCreate'; */
/* import BranchGroup from './components/Maintenance/BranchGroup';
import BranchGroupCreate from './components/Maintenance/BranchGroupCreate'; */
/*
import Area from './components/Maintenance/Area';
import AreaCreate from './components/Maintenance/AreaCreate';
*/

/* import AdminFee from './components/Maintenance/AdminFee';
import AdminFeeCreate from './components/Maintenance/AdminFeeCreate'; */
/*
import Department from './components/Maintenance/Department';
import DepartmentCreate from './components/Maintenance/DepartmentCreate';
import DepartmentSection from './components/Maintenance/DepartmentSection';
import DepartmentSectionCreate from './components/Maintenance/DepartmentSectionCreate';
import CostCenter from './components/Maintenance/CostCenter';
import CostCenterCreate from './components/Maintenance/CostCenterCreate';
import Position from './components/Maintenance/Position';
import PositionCreate from './components/Maintenance/PositionCreate';
*/
// END BILLING
/*
import ApplicationForm from './components/RECRUITMENT/ApplicationForm';
import ApplicationFormCreate from './components/RECRUITMENT/ApplicationFormCreate';
import PreliminaryInterview from './components/RECRUITMENT/PreliminaryInterview';
import PreliminaryInterviewCreate from './components/RECRUITMENT/PreliminaryInterviewCreate';
import ExamResult from './components/RECRUITMENT/ExamResult';
import ExamResultCreate from './components/RECRUITMENT/ExamResultCreate';
import BackgroundInvestigation from './components/RECRUITMENT/BackgroundInvestigation';
import BackgroundInvestigationCreate from './components/RECRUITMENT/BackgroundInvestigationCreate';
import ClientEndorsement from './components/RECRUITMENT/ClientEndorsement';
import ClientEndorsementCreate from './components/RECRUITMENT/ClientEndorsementCreate';
import FinalInterview from './components/RECRUITMENT/FinalInterview';
import FinalInterviewCreate from './components/RECRUITMENT/FinalInterviewCreate';
import JobOffer from './components/RECRUITMENT/JobOffer';
import JobOfferCreate from './components/RECRUITMENT/JobOfferCreate';
import ApplicationFormView from './components/RECRUITMENT/ApplicationFormView';
import PreliminaryInterviewsCreate from './components/RECRUITMENT/PreliminaryInterviewsCreate';
import ExamResultsCreate from './components/RECRUITMENT/ExamResultsCreate';
import BackgroundInvestigationsCreate from './components/RECRUITMENT/BackgroundInvestigationsCreate';
import ClientEndorsementsCreate from './components/RECRUITMENT/ClientEndorsementsCreate';
import FinalInterviewsCreate from './components/RECRUITMENT/FinalInterviewsCreate';
import JobOffersCreate from './components/RECRUITMENT/JobOffersCreate';
import BatchProfileUpload from './components/ADMIN/BatchProfileUpload';
import Diagnoseddisease from './components/ADMIN/Diagnoseddisease';
import DiagnoseddiseaseCreate from './components/ADMIN/DiagnoseddiseaseCreate';
import ExamCategories from './components/ADMIN/ExamCategories';
import ExamCategoriesCreate from './components/ADMIN/ExamCategoriesCreate';
import Exam from './components/ADMIN/Exam';
import ExamCreate from './components/ADMIN/ExamCreate';
import JobOpeningSource from './components/ADMIN/JobOpeningSource';
import JobOpeningSourceCreate from './components/ADMIN/JobOpeningSourceCreate';
import JobPosition from './components/ADMIN/JobPosition';
import JobPositionCreate from './components/ADMIN/JobPositionCreate';
import Nationality from './components/ADMIN/Nationality';
import NationalityCreate from './components/ADMIN/NationalityCreate';
import PregeneratedEmployeeNo from './components/ADMIN/PregeneratedEmployeeNo';
import PregeneratedEmployeeNoCreate from './components/ADMIN/PregeneratedEmployeeNoCreate';
import Religions from './components/ADMIN/Religions';
import ReligionCreate from './components/ADMIN/ReligionCreate';
import StoreOperation from './components/ADMIN/StoreOperation';
import StoreOperationCreate from './components/ADMIN/StoreOperationCreate';
import SupportGroup from './components/ADMIN/SupportGroup';
import SupportGroupCreate from './components/ADMIN/SupportGroupCreate';
import EmployeeFile from './components/ADMIN/EmployeeFile';
import Profile from './components/ADMIN/Profile';
import ProfileEdit from './components/ADMIN/ProfileEdit';
import EmployeeStatusType from './components/ADMIN/EmployeeStatusType';
import EmployeeStatusTypeCreate from './components/ADMIN/EmployeeStatusTypeCreate';
import AllegedInfraction from './components/ADMIN/AllegedInfraction';
import AllegedInfractionCreate from './components/ADMIN/AllegedInfractionCreate'; 
import Accounts from './components/ADMIN/Accounts';
import AccountsCreate from './components/ADMIN/AccountsCreate';
import Areas from './components/ADMIN/Areas';
import AreasCreate from './components/ADMIN/AreasCreate';
import Client from './components/ADMIN/Client';
import ClientCreate from './components/ADMIN/ClientCreate';
import Branch from './components/ADMIN/Branch';
import BranchCreate from './components/ADMIN/BranchCreate';
import Reason from './components/ADMIN/Reason';
import ReasonCreate from './components/ADMIN/ReasonCreate';
import LeaveRule from './components/ADMIN/LeaveRule';
import LeaveRuleCreate from './components/ADMIN/LeaveRuleCreate';
import LeaveRuleMapping from './components/ADMIN/LeaveRuleMapping';
import LeaveRuleMappingCreate from './components/ADMIN/LeaveRuleMappingCreate';
import ProductCategory from './components/ADMIN/ProductCategory';
import ProductCategoryCreate from './components/ADMIN/ProductCategoryCreate';
import ManageRateCard from './components/ADMIN/ManageRateCard';
import ManageRateCardCreate from './components/ADMIN/ManageRateCardCreate';
import Product from './components/ADMIN/Product';
import ProductCreate from './components/ADMIN/ProductCreate';
import Tax from './components/ADMIN/Tax';
import TaxCreate from './components/ADMIN/TaxCreate';
import AnnualTaxTable from './components/ADMIN/AnnualTaxTable';
import AnnualTaxTableCreate from './components/ADMIN/AnnualTaxTableCreate'; 
import TaxCode from './components/ADMIN/TaxCode';
import TaxCodeCreate from './components/ADMIN/TaxCodeCreate';
import EmployeeFileEdit from './components/ADMIN/EmployeeFileEdit';
import DeploymentClearanceTemplate from './components/ADMIN/DeploymentClearanceTemplate';
import DeploymentClearanceTemplateCreate from './components/ADMIN/DeploymentClearanceTemplateCreate';
import PendingJobOffer from './components/ADMIN/PendingJobOffer';
import TrainingDevelopment from './components/ADMIN/TrainingDevelopment';
import TrainingDevelopmentCreate from './components/ADMIN/TrainingDevelopmentCreate';
import AccountManagerProfile from './components/ADMIN/AccountManagerProfile';
import AccountManagerProfileCreate from './components/ADMIN/AccountManagerProfileCreate';
import AdministrationAccountManager from './components/ADMIN/AdministrationAccountManager';
import AdministrationAccountManagerCreate from './components/ADMIN/AdministrationAccountManagerCreate';

import User from './components/ADMIN/User';
import UserCreate from './components/ADMIN/UserCreate';
import Role from './components/ADMIN/Role';
import RoleCreate from './components/ADMIN/RoleCreate';
import Feature from './components/ADMIN/Feature';
import FeatureCreate from './components/ADMIN/FeatureCreate';
import AdministrationCoordinator from './components/ADMIN/AdministrationCoordinator';
import AdministrationCoordinatorCreate from './components/ADMIN/AdministrationCoordinatorCreate';
import BatchUpload from './components/ADMIN/BatchUpload';
import AccountManagerBatchApprove from './components/ADMIN/AccountManagerBatchApprove';
import ProfileBatchApproval from './components/ADMIN/ProfileBatchApproval';
import AdminProfileSearch from './components/ADMIN/AdminProfileSearch';
import ManningBatchApprove from './components/ADMIN/ManningBatchApprove';
import ManningAdministrator from './components/ADMIN/ManningAdministrator';
import UploadIndex from './components/ADMIN/UploadIndex';
import UploadingBatchApprove from './components/ADMIN/UploadingBatchApprove';
import ExamCreationDisplay from './components/ADMIN/ExamCreationDisplay';
// import ExamCreationCreateQuestion from './components/ADMIN/ExamCreationCreateQuestion';
import PendingJobOfferEdit from './components/ADMIN/PendingJobOfferEdit';



import RoleAccess from './components/Administrator/AccessRights/RoleAccess'
import UserAccess from './components/Administrator/AccessRights/UserAccess';
import Features from './components/Administrator/AccessRights/Features';
import CreateFeature from './components/Administrator/AccessRights/CreateFeature'





import Training from './components/Training/Trainings'
import TrainingCreate from './components/Training/TrainingCreate'
import TrainingSchedule from './components/Training/TrainingSchedule'
import TrainingScheduleCreate from './components/Training/TrainingScheduleCreate'
import TrainingRegister from './components/Training/TrainingRegister'
import TrainingRegisterCreate from './components/Training/TrainingRegisterCreate'
import PostTrainingExamination from './components/Training/PostTrainingExamination'
import PostTrainingExaminationCreate from './components/Training/PostTrainingExaminationCreate'
import PostTrainingExaminationViewEdit from './components/Training/PostTrainingExaminationViewEdit'
import EmployeePostTrainingExam from './components/Training/EmployeePostTrainingExam'
import EmployeePostTrainingExamAndEvaluationResult from './components/Training/EmployeePostTrainingExamAndEvaluationResult'
import TrainingEvaluationAndRecommendation from './components/Training/TrainingEvaluationAndRecommendation'

import TrainingType from './components/Training/TrainingType'
import TrainingTypeCreate from './components/Training/TrainingTypeCreate'

import Orientation from './components/Training/Orientation'

import EmployeeDeploymentClearance from './components/Training/Admin/EmployeeDeploymentClearance'
import EmployeeDeploymentClearanceCreate from './components/Training/Admin/EmployeeDeploymentClearanceCreate'
import RequiredDocuments from './components/Training/Admin/RequiredDocuments'
import RequiredDocumentsCreate from './components/Training/Admin/RequiredDocumentsCreate'
import EmployeeExitClearance from './components/Training/Admin/EmployeeExitClearance'
import EmployeeExitClearanceCreate from './components/Training/Admin/EmployeeExitClearanceCreate'
import EmployeeFinalsPay from './components/Training/Admin/EmployeeFinalsPay'
import EmployeeFinalsPayCreate from './components/Training/Admin/EmployeeFinalsPayCreate'
*/

// SAP START
import InventoryTransferRequest from './components/SapProject/InventoryTransferRequest';
import InventoryTransfer from './components/SapProject/InventoryTransfer';
import SalesOrder from './components/SapProject/SalesOrder';
import BPMasterData from './components/SapProject/BPMasterData';

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            isNavbarHidden: false
        };
    }
    render(){
        return (
            <div className="App">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <ProtectedRoute path="/home" exact component={Home}/>
                        <ProtectedRoute path="/InventoryTransferRequest" exact component={InventoryTransferRequest}/>
                        <ProtectedRoute path="/InventoryTransfer" exact component={InventoryTransfer}/>
                        <ProtectedRoute path="/SalesOrder" exact component={SalesOrder}/>
                        <ProtectedRoute path="/BPMasterData" exact component={BPMasterData}/>

                        <Route path="*" component={Unathorized}/>
                        
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }

}

export default App;
