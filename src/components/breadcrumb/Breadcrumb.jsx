import { HomeFilled, RightOutlined } from "@ant-design/icons";

export const Breadcrumb = ({ link, link1, link2 }) => {
  return (
    <div className="p-6 rounded-lg bg-[var(--bgWhite-color)] mb-6">
      <div className="flex items-center justify-between max-md:justify-start">
        <h4 className="text-xl font-medium text-[var(--textBlack-color)] max-md:hidden">
          {link}
        </h4>
        <div className="flex items-center justify-end gap-3 max-md:overflow-x-hidden max-md:justify-start">
          <p className="text-sm text-[var(--text-color)]">
            <HomeFilled />
          </p>
          <p className="text-xs scale-75 text-[var(--textBlack-color)]">
            <RightOutlined />
          </p>
          <p className="text-base text-[var(--textBlack-color)] whitespace-nowrap">
            {link1}
          </p>
          <p className="text-xs scale-75 text-[var(--textBlack-color)]">
            <RightOutlined />
          </p>
          <p className="text-base text-[var(--text-color)] whitespace-nowrap">
            {link2}
          </p>
        </div>
      </div>
    </div>
  );
};
