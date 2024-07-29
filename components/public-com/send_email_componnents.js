import { useState, Fragment } from "react";
import { sendMail } from "../../redux/APIS/API";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

function SendEmailButton({ list }) {
  const [isOn, setIsOn] = useState(false);
  const [email, setEmail] = useState();
  const [exitsEmail, setExitsEmail] = useState();
  const [error, setError] = useState(false);

  const router = useRouter();

  const { type, id, url } = router.query;

  async function getData(e) {
    e.preventDefault();

    if (isOn) {
      if (!email) {
        setError("This Field is requited");
        return;
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setError("This is invaild email adress");
        return;
      } else {
        setError(false);
      }

      let data = {
        email_id: email,
        detail_type: type,
        id: id ? id : "1",
        pdf_path: url ? url : "",
      };

      const res = await sendMail(data);

      router.back();
      if (res?.data?.data?.mail_status == true) {
        toast.success("Your email was successfully sent!");
      } else {
        toast.error(res?.data?.message);
      }
    }

    if (exitsEmail) {
      let getdata = list.filter((item) => item.ID == exitsEmail)[0];
      let data = {
        email_id: getdata?.primary_email,
        detail_type: type,
        id: id ? id : "1",
        pdf_path: url ? url : "",
      };

      const res = await sendMail(data);

      if (res?.data?.data?.mail_status == true) {
        toast.success("Your email was successfully sent!");
      } else {
        toast.error(res?.data?.message);
      }

      router.back();
    }
  }

  return (
    <div>
      <form onSubmit={getData}>
        <p className="text-[12px]  font-normal not-italic text-[#262626]  mt-4 pb-1">
          Choose a support team member from your list
        </p>
        <select
          aria-setsize={"0"}
          onChange={(e) => setExitsEmail(e.target.value)}
          className="items-center h-[35px] gap-[10px] flex font-medium w-full  text-[16px] px-[5px]  rounded-[6px] bg-[#FFF] text-[#000] border-[0.5px] border-[#A6A6A6] focus:border-black focus:outline-none"
        >
          <option
            disabled
            selected
            className=" py-[9px] px-[5px] optioncon text-[16px] font-normal not-italic text-[#A6A6A6]"
          >
            Choose support team member
          </option>
          {list?.map((item, index) => (
            <Fragment key={index}>
              {item && (
                <option
                  value={item.ID}
                  className=" py-[9px] px-[5px] optioncon text-[16px] font-normal not-italic text-[#262626]"
                >
                  {item?.primary_email}
                </option>
              )}
            </Fragment>
          ))}
        </select>
        <div className="flex justify-center items-center my-[10px]">
          <div className="text-[16px] font-normal not-italic text-[#595959] leading-[20px]">
            OR
          </div>
        </div>

        <div className="p-2 bg-[#F0F0F0] border-[1px] border-dashed border-[#A6A6A6] rounded-md grid gap-4">
          <div className="flex gap-2">
            <input
              type="checkbox"
              className=" h-[28px] w-[28px] rounded-[6px] bg-[#FFFFFF] border-[0.5px] border-[#A6A6A6] focus:border-black focus:outline-none"
              id="addnew"
              defaultChecked={isOn}
              onClick={() => setIsOn(!isOn)}
            />
            <label
              htmlFor="addnew"
              className="text-[16px] font-normal not-italic text-[#262626]"
            >
              Send details to new email
            </label>
          </div>

          <div>
            <div>
              <p className="text-[12px] font-normal not-italic text-[#262626]">
                {"Enter new email"}
              </p>
              <input
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`Enter new ${type} email`}
                className={` ${
                  error ? " border-red-400" : "border-gray-400"
                }  'font-normal w-full text-[16px]  py-[9px] px-[5px] rounded-[5px]  text-[#000] 
                                 border-[1px] border-gray-400 focus:border-black focus:outline-none  focus:bg-[#FFFFFF]' ${
                                   isOn ? "bg-[#FFFFFF]" : "bg-[#F0F0F0]"
                                 }`}
              />

              <p className="text-[12px] font-normal not-italic text-[#262626]">
                {"Share data with a new email address"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-1 justify-center items-center">
          <button
            type="submit"
            className="flex gap-1 justify-center bg-[#F2DA31]   h-[45px] items-center  py-2 px-4  
                            rounded-[6px] hover:border-theme mt-[30px]"
          >
            <span className="text-[16px] font-normal not-italic text-[#262626]">
              Send Email
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendEmailButton;
