import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import forgotBanner from '../assets/images/auth/ForgotPasswordBanner.png';
import logoTitle from '../assets/images/auth/logoTitle.svg';

function ForgotPassword() {

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-lg-6 '>
                    <div className=' m-lg-5 border bg-white  p-2 p-md-5 my-2 box-shadow-custom'>
                        <div className='text-center mt-5'>
                            <img src={logoTitle} alt='icon' />
                        </div>
                        <h4 className='fs-25 fw-600 mt-5 text-center'>Forgot Your Password?</h4>
                        <p className='text-color fs-14 fw-500 text-center my-4'>We have your Back!</p>

                        <Form>
                            <FormGroup className='mt-5'>
                                <Label className="visually-hidden" for="Email">
                                    Email
                                </Label>
                                <Input
                                    id="Email"
                                    name="email"
                                    placeholder="Email"
                                    className='shadow-none border-0 border-bottom rounded-0 ps-0'
                                    type="email"
                                />
                            </FormGroup>
                            <div className='mt-2 text-start my-4 '>
                                <p className='fs-12 fw-500 text-color '>A link will be sent to your email to reset your password  </p>
                            </div>

                            <div className="d-grid gap-3 pb-5 mb-5">
                                <Button type='button' className=' fw-500 fs-15  btn-fill-color border-1 border-white py-2'  > Send Recovery Link</Button>

                            </div>



                        </Form>
                    </div>

                </div>
                <div className='col-12 col-lg-6 d-none d-lg-block'>
                    <div className='position-relative d-flex justify-content-center align-items-end vh-100' >
                        <div className='text-center'>
                            <img src={forgotBanner} alt='banner01' className='h-75 w-75' />
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default ForgotPassword;
