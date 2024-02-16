import Link from "next/link";
import Image from "next/image";
import defaultImageSlate from "@/app/public/images/default-slate.png";

type Props = {
  userName: string | any;
};

const UserProfiles: React.FC<Props> = ({ userName }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="text-center">
        <Link href="/">
          <Image
            alt="profile"
            src={defaultImageSlate}
            height={120}
            width={120}
          />
          <p className="text-md text-gray-600 mt-2">{userName}</p>
        </Link>
      </div>
    </div>
  );
};

export default UserProfiles;
