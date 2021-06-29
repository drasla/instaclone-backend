import {protectResolver} from "../users.utils";
import client from "../../client";

export default {
    Query: {
        me: protectResolver((_, __, {loggedInUser}) => client.user.findUnique({where: {id: loggedInUser.id}}))
    }
}