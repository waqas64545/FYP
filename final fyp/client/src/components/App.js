
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import SellerDashboard from './SellerDashboard';
import BuyerDashboard from './BuyerDashboard';
import AdminDashboard from './AdminDashboard';
import EditInfo from './EditInfo';
import NotFound from './NotFound';
import EditProduct from './EditProduct';
import DeleteSeller from './DeleteSeller';
import DeleteBuyers from './DeleteBuyers';
import DeletePosts from './DeletePost';


const App = () => (
     
     <BrowserRouter>
    
      <>
         <Header/>
       
          <Routes>

               <Route exact path='/' element={<Home />} />
               <Route exact path='/signup' element={<Signup />} />
               <Route exact path='/signin' element={<Signin />} />
               <Route exact path='/seller/dashboard' element={<SellerDashboard />} />
               <Route exact path='/buyer/dashboard' element={<BuyerDashboard />} />
               <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
               <Route exact path='/editproduct/:id' element={<EditProduct/>}/>
               <Route exact path='/editInfo' element={<EditInfo/>}/>
               <Route exact path='/admin/deleteSeller' element={<DeleteSeller/>}/>
               <Route exact path='/admin/deleteBuyer' element={<DeleteBuyers/>}/>
               <Route exact path='/admin/deletePost' element={<DeletePosts/>}/>
               <Route element={<NotFound />} />

          </Routes>

        
      </>

       
       
       
     </BrowserRouter>
     
);


export default App;
