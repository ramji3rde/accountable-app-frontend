import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { postForgetAPI } from '../../redux/APIS/API'
import toast from 'react-hot-toast'
import { IoChevronForwardOutline } from "react-icons/io5";
import Image from 'next/image'
import logo from '../../public/smi-logo.png'

function Resetpass() { 
   const router = useRouter()

   const validate = (values) => {
      const errors = {}

      if (!values.email) {
         errors.email = 'Please enter email'
      } else if (
         !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
         errors.email = 'Invalid email address'
      }

      return errors
   }

   const Forgetfarmik = useFormik({
      initialValues: {
         email: ''
      },
      validate,
      onSubmit: async (data, { resetForm }) => {
         try {
            const respon = await postForgetAPI(data)
            // console.log(respon)

            if (respon.data.success == false) {
               toast.error(respon.data.message)
               resetForm()
            } else if (respon.data.success == true) {
               toast.success(respon.data.message)
               router.push('/')
            }

         } catch (error) {
            console.log(error.response)
            toast.error(error.response.data.message)
         }
      }
   })

   return (
      <div className="forget-page w-full h-screen min-h-screen overflow-x-hidden flex items-center gradientLogin">
         <div className="w-[90%] sm:w-[50%] min-h-screen h-full mx-auto grid content-evenly">
            <div className='h-[40%] grid items-center '>
               <div className="grid grid-cols-1 ">
                  <div className="logo-wrapper">
                     <div className="smi-logo">
                        <Image src={logo} />
                     </div>
                  </div>
               </div>
            </div>

            <div className='h-[60%] grid items-end pb-12 '>
               <div className='md:px-[50px] md:bg-white pt-5 pb-3 px-8 bg-[#ffffffbf] md:shadow-[0_0_8px_3px_#a0a0a11f] rounded-[15px]'>
                  <div className='mb-5 '>
                     <h1 className='text-center font-[400] Oswald-font pb-2 text-[24px]'>Forgot Password</h1>
                     <p className='font-[500] text-blackC text-[11px] leading-[15px]'>
                        {` Enter your email and we'll send you a link to reset your password. `}
                     </p>
                  </div>

                  <form
                     method="POST"
                     onSubmit={Forgetfarmik.handleSubmit}
                     className="h-[50%]"
                  >

                     <div className="grid grid-cols-1 gap-[20px]">
                        <div className="grid grid-cols-1">
                           <label className="font-medium text-[12px] mb-[3px] text-[#262626] ">
                              Enter Email or Username
                           </label>
                           <input
                              name="email"
                              id="username"
                              placeholder="Example@gmail.com"
                              onChange={Forgetfarmik.handleChange}
                              value={Forgetfarmik.values.email}
                              className={` ${Forgetfarmik.errors.email ? 'border-red-500 focus:border-red-500' : 'border-inputBorderColor focus:border-theme'} 
                              font-medium text-[12px] w-full h-[35px] py-[5px] px-[10px] rounded-[5px] bg-[#FFF]text-theme border-[1px]  focus:outline-none `}
                           />
                           {Forgetfarmik.errors.email && (
                              <span className="font-medium text-red-500 text-[15px]">
                                 {Forgetfarmik.errors.email}
                              </span>
                           )}
                        </div>
                     </div>

                     <div className="grid grid-cols-1 w-full justify-items-start mt-[25px]">

                        <div className="grid grid-cols-1 w-full justify-items-center bg-buttonColor shadow-[0_0_8px_3px_#a0a0a11f] rounded-[5px] h-[40px] ">
                           
                           <button
                              type="submit"
                              className="font-medium text-blackC w-full h-[40px]">
                              Send Email Link
                           </button>
                        </div>

                        <div className="grid grid-cols-1 w-full justify-items-center mt-3">
                           <div className="flex flex-row sm:flex-row items-center justify-center sm:justify-between">
                              <Link href="/">
                                 <a className="font-medium flex flex-row items-center gap-[2px] text-blackC text-[14px] tracking-[.025em]">
                                    Sign in to Account <IoChevronForwardOutline />
                                 </a>
                              </Link>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Resetpass
