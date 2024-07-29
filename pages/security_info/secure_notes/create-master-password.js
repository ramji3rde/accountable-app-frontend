import React, { useState } from 'react'
import { useFormik } from 'formik'
import SubHeader from '../../../components/public-com/header'
import Input from '../../../components/public-com/form/Input'
import Button from '../../../components/public-com/form/button'
import { useRouter } from 'next/router'
import { craeteMasterPasswordAPI } from '../../../redux/APIS/API'
import { toast } from 'react-hot-toast'

function CreateMasterPassword() {

    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)
    const [passwordCheck, setPasswordCheck] = useState('')

    const router = useRouter()

    const validate = (values) => {
        const errors = {}

        if (!values.master_password) {
            errors.master_password = 'Please Enter Master Password'
            setPasswordCheck('')
        } else if (values.master_password.length < 12) {

            setPasswordCheck('very weak')

        } else if (!/[a-z]/.test(values.master_password)) {

            setPasswordCheck('weak')

        } else if (!/[A-Z]/.test(values.master_password)) {

            setPasswordCheck('good')

        } else if (!/[0-9]/.test(values.master_password)) {

            setPasswordCheck('better')

        }
        else if (/^(?=.*?[!@#$%^&*]).{1,}$/.test(values.master_password)) {

            setPasswordCheck('strong')

        }


        if (!values.master_repassword) {
            errors.master_repassword = 'Please Enter Master Repassword'
        } else if (values.master_repassword !== values.master_password) {
            errors.master_repassword = 'Password Is not Match'
        }

        return errors
    }




    const SecureMasterPasswordFormik = useFormik({
        initialValues: {
            master_password: '',
            master_repassword: '',
            master_hint: '',
        },
        validate,
        onSubmit: async (value, { resetForm }) => {
            try {

                console.log(value)
                let data = {
                    "master_password": value.master_password,
                    "password_hint": value.master_hint
                }

                console.log(data)

                const res = await craeteMasterPasswordAPI(data)

                console.log(res)
                if (res?.status) {
                    toast.success('Master Password Create SuccessFully')
                    router.push('/security_info/secure_notes?login=true')
                } else {
                    toast.error('Master Password Not Create Successfully, Try again Later')
                }

                resetForm()

            } catch (err) {
                console.log(err, 'err')
            }


        }
    })


    return (
        <div>

            <SubHeader title={"Create Master Password"} backUrl={'/security_info/secure_notes'} />

            <div className="px-4 pb-32 pt-6 ">

                <div className='grid gap-3'>
                    <div>
                        <Input
                            label={'Master Password'}
                            name='master_password'
                            placeholder={'Enter master password'}
                            type={'password'}
                            Required={true}
                            formik={SecureMasterPasswordFormik}
                            eyeToggle={() => setShowPassword(!showPassword)}
                            toggleValue={showPassword}
                            validation={SecureMasterPasswordFormik.errors.master_password}
                        />


                        <div className=' py-2 grid gap-3 '>

                            <span>Must be different from your admin login password. Must be 12 characters minimum</span>
                            <div className={`
                         
                            w-full h-[10px] bg-slate-200 `}>
                                <div className={`
                            ${passwordCheck == 'very weak' && 'w-[30%] bg-red-500'}
                            ${passwordCheck == 'weak' && 'w-[50%] bg-orange-300'}
                            ${passwordCheck == 'good' && 'w-[70%] bg-orange-500'}
                            ${passwordCheck == 'better' && 'w-[80%] bg-green-300'}
                            ${passwordCheck == 'strong' && 'w-[100%] bg-green-500'}
                             h-[10px] ease-in-out duration-500  `}>
                                </div>
                            </div>

                        </div>

                    </div>


                    <Input
                        label={'Re-type Master Password'}
                        name='master_repassword'
                        placeholder={'Re-type master password'}
                        type={'password'}
                        Required={true}
                        formik={SecureMasterPasswordFormik}
                        eyeToggle={() => setShowRePassword(!showRePassword)}
                        toggleValue={showRePassword}
                        validation={SecureMasterPasswordFormik.errors.master_repassword}
                    />

                    <div>

                        <Input
                            label={'Master Password Hint'}
                            name='master_hint'
                            placeholder={'Password hint'}
                            Optional={true}
                            formik={SecureMasterPasswordFormik}
                        />

                        <span>Enter a password hint to help remind yourself of your password</span>

                    </div>


                    <div className='flex justify-center pt-4 ' >
                        <div className='w-[62%]' >
                            <Button
                                Type={'submit'}
                                OnClick={() => SecureMasterPasswordFormik.handleSubmit()}
                                bgcolor={'bg-buttonColor drop-shadow-2xl'}
                                lebal={'Confirm Master Password'}
                            />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default CreateMasterPassword