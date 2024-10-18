import AnchorCustom from "../../Components/AnchorCustom";
import StudentFooterActions from "../FooterWeb";
import { HeaderWeb } from "../HeaderWeb";
import { DisCip } from "./DisCip/DisCip";
import { Reward } from "./Reward/Reward";
import "./Discipline.scss";
export const DisciplineAndReward = () => {
  return (
    <div className="discipline-reward">
      <HeaderWeb name="Quản lý học sinh" disAble={true} />
      <div className="discipline-reward_content">
        <AnchorCustom
          items={[
            {
              key: "khenthuong",
              href: "#khenthuong",
              title: "Khen Thưởng",
              element: <Reward />,
            },
            {
              key: "kyluat",
              href: "#kyluat",
              title: "Kỷ luật",
              element: <DisCip />,
            },
          ]}
        />
      </div>
    </div>
  );
};
