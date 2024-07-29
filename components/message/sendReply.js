import React from "react";
import { useState } from "react";
import { getMessageUserDetails } from "../../redux/action/tenantsMessageDetails";
import { useDispatch } from "react-redux";
import { replyMessage, replyMessageProject } from "../../redux/APIS/API";
import { toast } from "react-hot-toast";
import { getTenantsUserDetails } from "../../redux/action/tenantsuserDetails";

function SendReply({ ID, clientname }) {
  const [raplyValue, setRaplyValue] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (value) => {
    if (clientname == "message") {
      const data = {
        title: value,
        message_id: ID,
      };

      const res = await replyMessage(data);

      toast.success("Send Reply Successfully");

      const MSGID = { messageId: ID };

      dispatch(getMessageUserDetails(MSGID));
    }

    if (clientname == "report") {
      const data = {
        title: value,
        project_id: ID,
      };

      const res = await replyMessageProject(data);

      toast.success("Send Reply Successfully");

      dispatch(
        getTenantsUserDetails({
          project_id: ID,
        })
      );
    }
  };

  return (
    <div>
      <span className="text-[13px] ">Send your reply to this message</span>
      <div className="inputBox pt-2">
        <textarea
          name="raplyValue"
          id="raplyValue"
          placeholder="Type reply here"
          onChange={(e) => setRaplyValue(e.target.value)}
          value={raplyValue}
          rows="4"
          className="font-normal not-italic h-[98px] w-full text-[16px] py-[6px] px-[5px] rounded-[6px]
                                bg-[#FFF] text-[#000] border-[0.5px] border-solid border-[#A6A6A6] focus:border-black focus:outline-none"
        />

        <div className="w-[40%] pt-[10px]">
          <div
            className={`grid grid-cols-1  bg-buttonColor rounded-[6px] h-[45px] `}
          >
            <button
              onClick={() => handleSubmit(raplyValue)}
              className={`text-blackC  w-full  h-[45px]  text-[16px] font-sans font-normal`}
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendReply;
