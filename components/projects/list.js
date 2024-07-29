import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ProjectDetail } from "../../redux/action/projectDetails";
import Loader from "../public-com/loader";
import { useState, useEffect } from "react";
import { getProjectsListAPI } from "../../redux/APIS/API";

function ProjectList() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [projects, setProjects] = useState([]);

  const project = useSelector((state) => state.projects.projects.data);

  const loading = useSelector((state) => state.projects.loading);

  const itemData = useSelector((state) => state.projectDetails.details);

  function ProjectsItem(id) {
    try {
      const data = { project_id: "" + id };
      dispatch(ProjectDetail(data));

      router.push("/projects/details");
    } catch (error) {
      console.log(error);
    }
  }

  async function getProjectsList() {
    try {
      const res = await getProjectsListAPI();
      setProjects(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (itemData == null) {
      dispatch(ProjectDetail());
    }
  }, []);

  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <div className="list">
      {loading ? (
        <Loader />
      ) : (
        <div className="body">
          <div className="ListDetails mb-20 bg-[#f4f5f7] pb-[70px]">
            {projects?.map((item, index) => (
              <div
                key={index}
                className="flex items-center w-[100%]  gap-[3px] pt-[5px] pl-[12px] "
              >
                <div className="w-full list-bg flex">
                  <div
                    className="w-[80%] py-[10px] pl-[16px]"
                    onClick={() => ProjectsItem(item.ID)}
                  >
                    <h1 className="text-[16px] font-[400] text-[#262626] capitalize pb-2">
                      {item.post_title}
                    </h1>
                    <div className="flex opacity-75 gap-[10px] items-center ">
                      <span className="text-[11px] text-[#262626]  font-normal capitalize ">
                        {item?.project_date &&
                          format(new Date(item?.project_date), "dd/MM/yyyy")}
                      </span>
                      <span
                        className={
                          item?.status === "Completed"
                            ? "text-[11px] text-[#262626] font-normal font-sans capitalize publish"
                            : "text-[11px] font-normal font-sans text-[#000] capitalize in-progress"
                        }
                      >
                        {item.status}
                      </span>
                      <span
                        className={
                          item?.services
                            ? "text-[11px] text-[#262626]  capitalize service"
                            : null
                        }
                      >
                        {item.services}
                      </span>
                    </div>
                  </div>
                  <div className="w-[20%] m-auto text-center">
                    <span className="text-[16px] font-normal text-[#000]  capitalize ">
                      {item.total_bids} {item.total_bids === 1 ? "Bid" : "Bids"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {project?.length == 0 && (
            <div className="absolute w-full h-full top-0 left-0 bg-[#f8fafc] z-[-99]">
              <div className="w-full h-full grid justify-center items-center z-[-99]">
                <div className="text-center">
                  <div>
                    <span>no data</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default ProjectList;
