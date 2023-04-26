import { BASE_URL } from "../constants"

export default (page: number): string => BASE_URL.replace("{page_number}", page ? `-${page.toString()}` : '');
