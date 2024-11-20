import { Router, Request, Response } from "express";
import CtrlAdmin from "@/controller/mgmt/admin/admin";

const router: Router = Router();

// 登入
router.post("/login", (eRequest: Request, eResponse: Response) => {
    new CtrlAdmin().login(eRequest, eResponse);
});

export default router;