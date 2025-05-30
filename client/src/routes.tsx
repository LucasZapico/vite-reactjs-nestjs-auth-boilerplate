import { BrowserRouter, Routes, Route } from "react-router";
import {
  
  HomePage,
  LoginPage,
  PrivacyPage,
  TermOfServicePage,
  FooPage,
  SignupPage,
  LandingPage
} from "@/pages";
import { AppLayout, BaseLayout } from "@/components";


export const RouteWrapper = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {process.env.NODE_ENV !== "production" ? (<Route path="/foo" element={<FooPage/>}/>): <></>}
        
      </Route>

      <Route element={<BaseLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermOfServicePage />} />
        {/* <Route path="register" element={<Register />} /> */}
      </Route>

      {/* <Route path="concerts">
    <Route index element={<ConcertsHome />} />
    <Route path=":city" element={<City />} />
    <Route path="trending" element={<Trending />} />
  </Route> */}
    </Routes>
  );
};
