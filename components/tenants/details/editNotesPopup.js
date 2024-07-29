import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  updateNoteAPI,
  updateNotesSupportTeamAPI,
} from "../../../redux/APIS/API";
import { useDispatch } from "react-redux";
import { getTenantDetail } from "../../../redux/action/tenants-detail";
import toast from "react-hot-toast";
import { getContractorsDetail } from "../../../redux/action/contractors-detail";
import { getExpensesDetails } from "../../../redux/action/expensesDetails";
import { getSingleEmergencyContact } from "../../../redux/action/emergency_contact_detail";
import { getSingleSecureNotes } from "../../../redux/action/secureNoteSingle";

function EditNotesPopup({
  index,
  detail,
  datashow,
  onClick,
  formik,
  EditId,
  clientName,
}) {

  const dispatch = useDispatch();

  const NoteFormik = useFormik({
    initialValues: {
      detail: detail.note_id ? detail.note : detail.detail,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (detail.note_id) {
          if (clientName === "contactors") {
            const Notedata = {
              user_id: EditId,
              notes: [
                {
                  note_id: detail.note_id,
                  note: values.detail,
                },
              ],
            };

            const respon = await updateNotesSupportTeamAPI(Notedata);

            dispatch(getContractorsDetail(EditId));

            toast.success(respon.data.message);
          }

          if (clientName === "tanants") {
            const Notedata = {
              post_id: EditId,
              notes: [
                {
                  note_id: detail.note_id,
                  note: values.detail,
                },
              ],
            };

            const respon = await updateNoteAPI(Notedata);

            dispatch(getTenantDetail(EditId));

            toast.success(respon.data.message);
          }

          if (clientName === "expenses") {
            const Notedata = {
              post_id: EditId,
              notes: [
                {
                  note_id: detail.note_id,
                  note: values.detail,
                },
              ],
            };

            const respon = await updateNoteAPI(Notedata);

            dispatch(getExpensesDetails(EditId));

            toast.success(respon.data.message);
          }

          if (clientName === "emergency") {
            const Notedata = {
              post_id: EditId,
              notes: [
                {
                  note_id: detail.note_id,
                  note: values.detail,
                },
              ],
            };

            const respon = await updateNoteAPI(Notedata);

            dispatch(getSingleEmergencyContact(EditId));

            toast.success(respon.data.message);
          }

          if (clientName === "secure_notes") {
            const Notedata = {
              post_id: EditId,
              notes: [
                {
                  note_id: detail.note_id,
                  note: values.detail,
                },
              ],
            };

            const respon = await updateNoteAPI(Notedata);

            dispatch(getSingleSecureNotes(EditId));

            toast.success(respon.data.message);
          }
        } else {
          const oldData = formik.values.notes;

          oldData[index] = values;

          formik.setFieldValue("notes", [...oldData]);

          resetForm();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className={datashow}>
      <div
        style={{ transition: ".5s" }}
        className="DeletePopup h-screen bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden"
      >
        <div>
          <div>
            <div className="h-screen transition-all bg-[#22222238] w-full fixed z-[100] top-0 left-0 overflow-hidden backdrop-blur-[1px]">
              <div className="">
                <div className="absolute w-[80%] top-[22%] left-[10%] mx-auto bg-white rounded-[10px]">
                  <div className="text-black  pt-8">
                    <div className="grid grid-cols-1 mx-4 ">
                      <div className="">
                        <span className="text-[20px] font-normal text-[#262626] Oswald-font">
                          Edit Notes
                        </span>
                      </div>
                      <hr className="bg-[#DEDEDE] mb-3 " />
                      <textarea
                        value={NoteFormik.values.detail}
                        onChange={NoteFormik.handleChange}
                        rows="6"
                        placeholder="Enter Your Details"
                        name="detail"
                        id="detail"
                        className="font-medium w-full text-[16px] py-[5px] px-[10px] rounded-[6px] h-[70px]
                                     bg-[#FFF] border-[#cfcfcf8f]  text-theme border-2 focus:border-theme focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-center mt-4">
                      <div className="bg-[#4DE060] rounded-bl-[10px] w-[50%] flex justify-center">
                        <button
                          type="button"
                          className=" py-4 mx-auto text-[16px]  w-full flex justify-center text-[#262626] 
                                        rounded-[10px] "
                          onClick={() => {
                            NoteFormik.handleSubmit();
                            onClick();
                          }}
                        >
                          Add
                        </button>
                      </div>

                      <div
                        onClick={() => {
                          onClick();
                        }}
                        className=" bg-[#CCD9E6] rounded-br-[10px] w-[50%]  flex justify-center"
                      >
                        <div
                          className="py-4 w-[100%] text-[16px] mx-auto flex justify-center text-[#262626] 
                                               rounded-[10px]"
                        >
                          <span className="">Cancel</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* </fosrm> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNotesPopup;
