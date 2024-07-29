import { useRouter } from "next/router";
import SubHeader from "../../components/public-com/header";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfileData } from "../../redux/action/getProfile";
import { useDispatch } from "react-redux";
import { classNames } from "@react-pdf-viewer/core";
import { feedbackEMailAPI } from "../../redux/APIS/API";
import toast from "react-hot-toast";

const Feedback = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileData());
  }, []);

  const router = useRouter();

  const [subject, setSubject] = useState();

  const profile = useSelector((state) => state?.getProfile?.profile?.data[0]);

  const feedbackFormik = useFormik({
    initialValues: {
      radioButtonValue: subject,
      message: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const res = await feedbackEMailAPI(values);

        res.status === 200
          ? toast.success("Feedback sent successfully")
          : toast.error("Something went wrong! Please try again");
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleRadioButtons = (e) => {
    setSubject(e.target.value);
  };
  return (
    <div className="app">
      <SubHeader title={"Send Feedback"} backUrl={"/dashboard"} />
      <div className="p-4">
        <p className="text-[16px] font-[500] pb-2">
          We want to hear your feedback!{" "}
        </p>
        <p className="text-[16px] font-[500]">
          Do you love the app or does it need a lot of work? Report a bug if you
          found something broken or request new features to add to the app.
        </p>
        <p className="text-[16px] font-[400] pt-3 w-31"> Choose subject</p>
        <div className="pt-3 flex items-center">
          <input
            className="peer hidden"
            type="radio"
            name="flexRadioDefault"
            id="LeaveFeedbackDefault"
            value="Leave Feedback"
            onChange={(e) => handleRadioButtons(e)}
          />
          <label
            className={
              " w-5 block h-5 rounded-full cursor-pointer bg-color-[#fff] border-[1px] border-[#CCC] peer-checked:border-[5px] peer-checked:border-[#154B88]"
            }
            htmlFor="LeaveFeedbackDefault"
          ></label>
          <label
            className="inline-block pl-[0.40rem] hover:cursor-pointer"
            htmlFor="LeaveFeedbackDefault"
          >
            Leave Feedback
          </label>
        </div>
        <div className="mb-[0.125rem] min-h-[1.5rem] pt-3 flex items-center">
          <input
            className="peer hidden"
            type="radio"
            name="flexRadioDefault"
            id="Report"
            value="Report Bug/Issues"
            onChange={(e) => handleRadioButtons(e)}
          />
          <label
            className={
              " w-5 block h-5 rounded-full cursor-pointer bg-color-[#fff] border-[1px] border-[#CCC] peer-checked:border-[5px] peer-checked:border-[#154B88]"
            }
            htmlFor="Report"
          ></label>
          <label
            className="inline-block pl-[0.40rem] hover:cursor-pointer"
            htmlFor="Report"
          >
            Report Bug/Issues
          </label>
        </div>
        <div className="mb-[0.125rem] min-h-[1.5rem] pt-3 flex items-center">
          <input
            className="peer hidden"
            type="radio"
            name="flexRadioDefault"
            id="RequestNew"
            value="Request New Features"
            onChange={(e) => handleRadioButtons(e)}
          />
          <label
            className={
              " w-5 block h-5 rounded-full cursor-pointer bg-color-[#fff] border-[1px] border-[#CCC] peer-checked:border-[5px] peer-checked:border-[#154B88]"
            }
            htmlFor="RequestNew"
          ></label>
          <label
            className="inline-block pl-[0.40rem] hover:cursor-pointer"
            htmlFor="RequestNew"
          >
            Request New Features
          </label>
        </div>
        <div className="mb-[0.125rem] block min-h-[1.5rem] pt-5">
          <label htmlFor="message" className="text-[13px] font-[300]">
            Enter Your message
          </label>
          <textarea
            id="message"
            rows="5"
            onChange={feedbackFormik.handleChange}
            value={feedbackFormik.values.message}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  white:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
            placeholder="Write your thoughts here..."
          />
        </div>
        <form onSubmit={feedbackFormik.handleSubmit}>
          <div className="fixed bottom-0 left-0 w-full shadow-[1px_-10px_13px_2px_#0000000d] ">
            <div className="grid grid-cols-2 w-full bg-[#fff] ">
              <div className="flex justify-center">
                <div className="w-full flex justify-center h-[70px] ">
                  <button
                    type="submit"
                    className="px-4 py-2 w-full mx-auto text-[22px] font-normal text-[#262626] bg-[#4DE060]"
                  >
                    Send
                  </button>
                </div>
              </div>
              <div
                className="flex justify-center items-center bg-[#CCD9E6]"
                onClick={() => router.push("/dashboard")}
              >
                <div className="px-4 py-2 w-full mx-auto flex justify-center  text-[22px] font-normal text-[#262626]">
                  <span className="">Cancel</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
