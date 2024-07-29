import { useEffect } from "react";
import SendEmailButton from "../../components/public-com/send_email_componnents";
import { useDispatch, useSelector } from "react-redux";
import { getIncidents } from "../../redux/action/incidents";
import SubHeader from "../../components/public-com/header";

function SendEmail() {
  const dispatch = useDispatch();

  const item = useSelector((state) => state?.incidents?.incidents);

  useEffect(() => {
    let data = {
      posts_per_page: "-1",
      paged: "1",
      sort_by_field: "a-z",
      search_by_keyword: "",
    };

    dispatch(getIncidents(data));
  }, [dispatch]);

  return (
    <div>
      <SubHeader title={"Incidents"} backUrl={"/incidents/list"} />
      <div className="p-4 ">
        <SendEmailButton list={item} type={"support team"} />
      </div>
    </div>
  );
}

export default SendEmail;
