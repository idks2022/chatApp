import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserSkeleton = () => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Skeleton circle={true} height={40} width={40} />
      </ListItemAvatar>
      <ListItemText
        primary={<Skeleton width={100} />}
        secondary={<Skeleton width={150} />}
      />
    </ListItem>
  );
};

export default UserSkeleton;
