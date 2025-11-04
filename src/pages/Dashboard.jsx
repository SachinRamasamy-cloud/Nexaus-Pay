import React, { useEffect, useState } from "react";
import { getUserByNumber } from "../server/allAPI";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ user, setuser }) {

    const navigate = useNavigate();
    const timer = useState("")
    const [tableFade, setTableFade] = useState(true);  //table fade animation
    const transactions = user.transactions || []; //stores the history

    useEffect(() => {
        if (!user) return;

        // upadate user ervry 2000ms 
        const interval = setInterval(async () => {
            const updated = await getUserByNumber(user?.number);
            if (updated) {
                setuser(updated);
                localStorage.setItem("user", JSON.stringify(updated));
            }
        }, 2000);
        return () => clearInterval(interval);
    }, [user?.number]);

    // table animation suffle and show only 3 cards
    const transanime = (arr, count = 3) => {
        if (!arr.length) return [];
        const shuffled = [...arr].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    };

    const [table, settable] = useState(
        transanime(transactions)
    );

    // used in popup upi copy
    const [upicopy, setupicopy] = useState(false);
    const handleupicopy = () => {
        navigator.clipboard.writeText(user.number);
        setupicopy(true);
        setTimeout(() => setupicopy(false), 2000);
    };


    useEffect(() => {
        const tableTimer = setInterval(() => {
            setTableFade(false);
            setTimeout(() => {
                settable(transanime(transactions));
                setTableFade(true);
            }, 500);
        }, 3000);
        return () => clearInterval(tableTimer);
    }, [JSON.stringify(transactions)]);

    // paying button 
    const handlepay = (action) => {
        if (action === "pay") navigate("/pay", { state: { mode: "send" } });
        else if (action === "add") navigate("/pay", { state: { mode: "add" } });
        else {
            setpopup(true);
        }
    };




    const favuratecont = [
        {
            name: "Priya",
            img: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA7AMBEQACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAABAAIDBQYEBwj/xAA5EAABBAECAwYCCQMEAwAAAAABAAIDEQQFIRIxQQYTIlFhcRSRByMyQlKBobHRYsHwFSTh8TOSov/EABsBAQEAAwEBAQAAAAAAAAAAAAABAgMEBQYH/8QAMhEBAAICAQMCBAQFBAMAAAAAAAECAxEEEiExBUETUWGxBiIycRRCgaHRYpHB8SNS8P/aAAwDAQACEQMRAD8A17V6b59K1RTwoyOCKIKA2gcoEgNoohFOUCQJAgaRWZ1Xt7oen5BgEkmVI0074dvEGnys7LXbLWvl0U42S8b058b6RdDmeBJ8RDZ5vYD+xWH8RRn/AAWWfDS6bqmDqTC7CyY5QOYGxHuDutlb1v4lovivj/VCwCyYnKKSBBFPQJQJAQiigSikgCqEgoWre5IStUU4FJUrUBtDZWgdaKIKgVoHAop4KiigjyZ4saCSfIe2OGJpc5zjsAElYiZnUPHu1fbnUNVyHY+m5D8TFJ4Y2s+3L7rlyZpnw9LDxIiPzeVLi9ldcnaCYCYiLaa4f0XJbLXb0a8e0HSdnc7DkaMuFzWP2Dxtv7KfEiV+DNVtoeXNpmY1kT+DIiHEwfjHWv4KlbzWdwXpF46bPWuz2s4+t4QngPDIw8M0Z5sd5ey9LHki8bh4WbDOK2pWoWbWKAoFaKIQFAlAUUkDlFAogKihat7kPCKIKgNoFaA2gIKGxvZRTgUUbUDwUU4KK82+lnXHNMOkQyFrK7zIrqALr/PNc2e/8sO/h497vPsqPo60FvA3VctofLI7wX0C8/LffaHu8fFqOqXr2DjsEbXcO3qFoiG61vY/UdGxtRxZGujaXEbA8j/nmsunttr65idS8a1TTZodTfizWyeB12etnwuHoRdrOLdmFq91n2L1B2H2vhiLy0ZbTFKOjtrYT67Efl6rq40z1vP51YnF+z1oLveRAoEgVoEEU5QFAUUkDlAEUFUUAW9xnWilaBcSBWgXEibEORT7RdiCpIeCosHAqKcXBoJcQAOZPRFeG/Sbmsl17IdESXAFrrFc/wDpcWbvd6/ErNcPdrsDPGk6NgPMuPAx0TQwSNc9zzVmmt6Lg6YmdPYi0xWJa7s5r781zIZ+5JdXAYrAo8rBWExplHeNpu0evZmjzNYybHiZsDxROkduaGwWVd/JhaKzHVMsD9IGazJGmatFM2SQ97jyHgLHdNiP7q1jzDG/bUqHslqgg15uTMGP4KLeIcjY5/lxV7rdWeiYmHLkr8Stqy92abaHdCvUeCcopKhIhBRYFFOBQG1AkDgikgCDPhb3GVoFaAEoASqmw4kBDk0uzw5QSAouz2lSVPBUVDnurElNkU0k10AUV8+5EORquYwyX3mTK4gk8+tf2XmXme8vo8VYtMUez9mMKDJw4I8uBpdHEPtc27Bclo3L0KxqHbG3FZ2ggbBw8LCAXcljHlnMdl7qAwp8mATsaXOPheRtY6WrPlrpuImYZv6VdJx8nsq4wR3NjyskYW8zZoj5H9FY1W0aa+94nbyE4kYnjLXGHIHhJHJ3o4dD7LdEzPZpvHTO30FgsdHhwtkdxPEYs+q9WI7PnZmNplUJAkCCByi7K0NlaKcFAbQG0UkRnQdl0OMLQIlACUAJRDbWWk2Vpo2c1yxXaVpUZJQUWErVGUHcIcCHCweY81FeZ9rexWVLC7/TGl7sB5kgjbs58biXU0/iBv32XPfFuJ09DByYi8Tb3d3YHO+K0OJs8sglZxxPL3HiDgfvLys1dWe/xrdVFxhSzNziMvFg4mG2SbkH2WHs7aUraO8tXH3+bid2+PHbBW9M3/JWfDRetKW3HlmPpMyW4fZA4rJT32TPFDGXu3Pis7+zSrhjdnPnt+Vlvo67NjUch2o5jPqsd/ABz7x4O/PyXZgxTa258Q83mZ4pXpr5l6wNhQ2AXe8gQgSBWgSBJpSTQKiiCiiEDlArQZy10uMigbaJIWkJsLV0gWiFaKIKCVpWLKJTMKjJKCjKEgWLIaDgQ4WDzHmnjuT4U2dpGnadhzzYmK2KaWQOc/iJLyed3zXFyqV+Ht63puXJOeK77G6VnRwO4J2kt6HhteW+h00+PltnhAhid6ktoUm9tM11O9sn2y7Iz9oc2B5yWsZBs1juQvmQK5rs42Hrrt53M5XwrxC57P6XHoulRYMRsMskgUCSbJpehSvTWIePlyTkvNpWSyaxtArQBAbQJAUCRRUNiCijaKKDNLocJWgBKQBaqASiG2gFoHgpIlYsWUJmIzhM0qKkBWLIpJWRML5HNYwfecaSZiveWda2tOqx3YrVtWdqGr4z4nkYUL3RV+JxGzv0I/NeHn5nxcnRHh9fxPS/4bjxkt+qZ7/RfYUAE7PI77rS3T2auF7YoS95DWNFknyWcOe0blSYeqtzNUlDL7qQfVE9a6/mtnB5MTlmntPj92r1XgWji1ze8ef2lZr2XzAcSBFyBWhsbRRUCBQG0BQK0BCkqSBWgzi6XESBtoASqhpKIbaBWge0oJWrGWcJmH2/NRltTZvanEgtmKHZEl9PC358152b1HDj/T3l7/E/D/KzanJ+WP7qubtFrM7T3DYIWeYZZHz/AIXn39XtPj7PcxfhnDH69z/XSk1E6llZGO/OzJZvEHFrneFvXlyXJfmWy76peph9NxcbXw6xH/3zdulwd/j5EDti4hzPQjcFc3Vq0S6713SYlr8SQxafDJlnhkBLST5grtrO3j2r31Dn1PUpdRLcSOSoB4pg0/aHRvsVqzZemNR5buNxtz1z4cuZO3Fx+9DqcXNa2tua4qzMTuHoxSLT02jsmwe0s8XAycGZp+8dnAe/Verx/U707ZO/3eLzfw7hy7vh/LP9v8wvINcwJq45hC7ylHD+vJerj52DJ/Np87n9F5uL+Tqj6f48rAODgC0gg8iF17iY28qYmJ1JIggop1oo2gKgVoFaBIHWoEisza6nAVouwLkDS5ENtEN4kNkChtK0oQlapLJW9ps52FpT+6dUkx7tp8r5n5Lj5ub4WLt5ns9j0bixyOVHV4r3/wAf3ZCFgjlxXvH2nd389wV8pM9W4fpOKvTENCyJtAV7rnb5lR6q6X4h7oyPDsLC2U7eWF9+ytw5s/SNQknnEk8bgOIE8x5jyXVaaZKxHhyRjtjtM/NqczVxrOLDHiv4Y3facRR4vL3WNsk1jXuwx8SJydU+FHJomT/qPxEOW+N7B4nNNH29VhHI1XUw67YYtbe2iYx08MbcqpHNN2R181o2z6Yr4STFkY2bVNtQruYVUvfuczHice9LQNuQPUlZVnXcvpotKz5MKSDHc/jidtz/AGC9Hh+oXxWitvDw/U/ScXKpOSkavH9/3am/l0X0j4GYn3K1UG1FG0UQUDrQIEICopIDaDL8S6XBsC5EMLlTZpchs3iRCtDYgoqVpUVM1ykrEsv2tye8yocUH/xjjd7leJ6pljqinyfZfhrjz0Tln3n7ODNZ/tseQfclZXruvn8c/m0+0mPyxK8ceH5LWyjurJYg+VgPMuFrJZjusJIWSVbQdq3WKOCLFjww50LGt45Lcd72vl/nRbOuZjUsOjvuFgAI4ufPe/Na2yO8pIj4AUYy5dQk7uNz3bgc1Yja9oq5tKld8Ocp+0mUSGf0s81naNdmuPzTuVlCI2zw+E8ZPCzfp1WMeS2+mWxgdxQxn+ml9fxb9eGsvzH1DHGLlXrHz+/dIuhxiCi7K0BtRdnXsgQKKdaAoDagypK6XAaSqhhKAEqhpKIVoHAqKkaUVK0qDCam45Ov5jS/Yy8APlQA/dfL+o36stpj5v0v0XH0cTFH0+/dHLkcWld3IfrIMiMHf+pefWv5/wCkvZm+qd2ll5gg9FzuirlJ/wBy0eSpLuH3VGMufKA7t/oHH9FYXXZzjJ+JI4BTQ0D80SsrKPkAokqztJY09wZzdss8f6mM96kzhxzisJHhgbw30Ck9+7Kuu6w0/wCskOR57R3+HzU8MMnjTU6VJx4TD6u/dfUel23xo+ky/P8A1+nTzp+sR9tOy16DxSQFFJAQUBtDY2obEFFFFZUldLzzCVUNJQAlAECCIcEU9pUVKw2ix5YCcFmo5UnX4h5/+ivjuVP/AJbR9Z+79W9PrrjYZ/01+0G69D3c1xCmZMW/kHDcH9Fpwzvz7OzNHafrDQ4E7cvFZI2+IABw9Vz3jVtOms9hbC85Jc4eEclFdzG+ajCZc2pEtw5GtAJINHyWUeWHTMzvblxA1oawDYAUpPlnHhZxNdV1siTLi1GCTLe2IDwDclNso1EOHNx35Gvtjv6jHx28Q/ESTQW7tGL6tVJ3aVvC4EFjDsOZWlsmPm0ukOAhMQ+6AfmvofSLxNJp8u/+74f8SYp+JTL89x/t/wBu66XsPmTgUUbUCtArQFAbRRBUBtDbJ2upwAUQwlVCJQC0UgUDgUDwVFSxndRWSkjjmlnc1ovv336eIr4nlzPx7/vP3frvp1Y/g8X0rH2hNl4PxemNjvxt2afLyWitprbcO21YtHSpuz+VNj5UsThs1w4m+V7fuFvz1rMRaGjDaZmaz7NWZGjxLkdWk0bmubdo1zHdy6mLhcw8uHZWCPCPDYIxfNJZa7LFkja3RrmrnnygwUzmozinbu4Yu8yJpRjML55CBTeg5fytla2vqsJa1McTMzp3wxPxnvgmaA6I+OjfTzUtXpnUsYvGSsWj3W+iyVkkuNCRvCB6jdel6Tfpz6+bwPxFh6+HuP5Z3/wuyV9I+C2IKqjaAWgI5oHKKSAhArQZS10uA0qhqIVoBaJsbRRBQPBQSNUWfDI4jr1Cdg5ukeR8yviuXMTkt+8/d+vem7rgxx/pj7LfGeGv4Htc0nblsVx6ehbWuzPT6VqGPrWXkQY8s2JNRY+McXCeuw352uzUXw1iPMPOrl6ORebT2nWv+XUzIeLZK8tPLfZc01mHoVtE+EuFqMkeb8NPzPI/3UmvbaTb2WGo8cgc0gC3ACvLZYpXw5zK5z+Bh8DdkZi7JDHcJI+aM9uWfIfk5UGLjuAdIfE6/stHM/56Ldhx9Xlz8jN8OO3lt9IggZF3TIXQEbiKI+NwPVx9efNd1YiOzw8uS1p6pkMp0WE2SHIdBhwvNcER4pZQVrv01iYns24YtkmJrHVMePlDi0ZvxOc2V/G1sIJYDtZ5WVl6XSLcmv07sfX8s4eBfpjfVqGhBul9Q/O/odaGxUUkBRTgopIAUAtEZS11OELRAtACiAgNhEEFFPFod0rDRCeTxEslgRA5krJe8DrcwcBo8+a+I5ETW9v3l+w8OerFS0e8QuIsLGHFwxgkiiSbJXPNpdcwusDOJdHiyEEtZQNbrqxWi1dPI5OOaW2sMnT8fMjrJxY5S78TbW7o254z2jxKBnZXS8gB78RnEzZr2kghSMca0y/i8kTE7R5/ZZssRZi5s0Lq24gHj+f1WqePEuinqN4/VG1I/s1q2FE4Q9zkV9jhdwn8wf5K1W48uvH6hinz2ZnO0DX5DJJKyWIeTRxX8lsr00mI6dsrZovHa+ll2I0TJxYcjLzY5XZb3cMTXtNNZ5n/ADyXTaa9umNPLtNpmeq22pinghZI3IM+MCd3ttr5j136LG1617yUx2yfpjbgny/izHEzBGNCyTjvjDnONEAuP5nYLky5euNR4epg484/zWncrPS2VkWDsW0un0udcmHk/iHvwbfvC4tfVS/PjlAUUlFFFEFRRtA0lVARGR4l0uEbRAtUAlE2FobEIHhQStRduTVM74KAcIPeSbNPQLh5/Knj49x5l7Xonpsc7PPXP5a6mY+f0Z+B5ZKHlxuzZ9V8pZ+l49R2j2XWmOdNTGGydvZYVx2tOjLyceOO892ywsTFhhax0TXOG5eed+6660ikPHy575bb32Oz8XIe3iwsnhLRsx42+f8A2s+ppisMpkdqdY0SYs1PB+ouu+iBePz6hbKzW3hjaJiV3gdpMbUImywlrmnrG6wnTKbdzdRhceEmvdOk2kbJEd7BHqsemF2mbJGPJNQbkM2DGz8OTHyG+Fw2cObD0I9lJrWY1K0velotWfDE4UveB0Urh3kbi1462DS87JTps+hxZYyU6o8uyKZ2NO1wvZZYMtsWSL18w1crj05WG2K/iWgjf3jGP6OAIX2VLddYtHu/Ls2KcOW2OfadJAdlk1jaBWppTgi7FFK0ARAtNIxgculwnByA8SqSFohWibEFF2ka5F2kBUEeXjx5UBjk2HMEdD5rTnw1zU6bOzhc3JwssZcf9fqo8fT5G5ropq7qMgl5NWPRfN5eJbHkmtvZ+g4fVKcjj1tinvPn6fOGqx8vCgiayFjQyuidE+zTa8e8upmpYxPhF+ik1ljF4dUOpR3tYWPTLLqhM/Lhm2kj4m+Rbaan3WPootR0LAkkdkYUb8Wc78UW3EfULKEnv5VzcnIxX91lDjaOTiN1siNtc9ndDlwyC2SKTUi0OhmW5rbY/iA6dVj0sup0Y+qURbgml3A5mBh6s0vaBDlgeCZnP2PmFhakWjUtmPNfFO6Spezsr9RkeydgEmLKY5hX3h5enIqcXhzbkRWfHlv9R9SjHwbZadrT2j92o6r6ePD87OCA2opWgc0qLA2i7IlDZrnIkmcSqbYsFdDiOBVQQUQ5VJJGIgoHgqMtntKLtICixIkBwAcARfVYzETHeGVbWp+mdMb2oe5mrSNjcWNDW0Gmui+Z9QtMciYh+iei0rbgUtbvM7VbM7KhNsnk/M2uaMtnoTgxz7O6PtBqMLyGyggeYWdMkz5aL8ekeHS3tbqjW7GL/wBT/K2baYxwhPbHV3vDe8jA9G/8qb1G2dcNZlx6hrGo5JqTKeLH3aC1xms2zxcaklzcyCTvI8ycO8+NdFbzMOa+KtfDsh7RamO7BnDr5ktCk28r8KvZewahkunjYZNnAWuWeRfUu6vCxWmIbDEyZcPJhYx/GHtBPHvWy9CcVZiJ/Z4dM9urJX/1mfuttJxIseCSZlmTJldLK483Osj9gF6fHx1pG493zvO5WTPbpv4j2dwK3uLZ1opIBaBwJSVK1ACSroAlNIYeaqP/2Q==",
        },
        {
            name: "Alina",
            img: "data:image/jpeg;base64,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",
        },
        {
            name: "Jack josph ",
            img: "data:image/jpeg;base64,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",
        },
        {
            name: "Boss",
            img: "data:image/jpeg;base64,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",
        },
    ];

    const [popup, setpopup] = useState(false);


    return (
        <div className="px-2 mt-2 min-h-screen space-y-4">
            {/* recive popup menu */}
            {popup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[400px] p-6 text-center relative animate-popup">
                        <button
                            onClick={() => setpopup(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <i className="fa-solid fa-xmark text-xl"></i>
                        </button>

                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-green-100 text-green-600 rounded-full">
                                <i className="fa-solid fa-arrow-down text-3xl"></i>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Ready to Receive Payment

                                <h2 className="text-xl flex gap-2 text-center font-semibold text-gray-800">
                                    Number: {user.number}
                                    <button
                                        onClick={handleupicopy}
                                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                    >
                                        <i className="fa-regular fa-copy"></i>
                                        {upicopy ? "Copied!" : ""}
                                    </button>
                                </h2>
                            </h2>
                            <p className="text-gray-600 text-sm">
                                Share your QR or phone number to receive funds instantly.
                            </p>
                            <button
                                onClick={() => setpopup(false)}
                                className="mt-3 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* top */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">
                {/* balance */}
                <div className="rounded-2xl bg-white shadow-lg p-6 sm:p-8 flex flex-col justify-between">

                    {/* balance */}
                    <div className="space-y-2">
                        <h1 className="text-gray-600 font-medium text-center sm:text-left text-lg sm:text-xl">
                            Welcome back, {user.name}
                        </h1>

                        <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight text-center sm:text-left">
                            ₹ {user.balance}
                        </h1>
                    </div>

                    {/* buttons */}
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-6">

                        {/* send */}
                        <button
                            onClick={() => handlepay("pay")}
                            className="group shine-btn flex items-center gap-2 w-28 sm:w-36 justify-center px-4 py-3 rounded-xl 
                       bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base 
                       transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                                <i className="fas fa-arrow-up text-white text-sm"></i>
                            </span>
                            Send
                        </button>

                        {/* receive */}
                        <button
                            onClick={() => handlepay("recive")}
                            className="group shine-btn flex items-center gap-2 w-28 sm:w-36 justify-center px-4 py-3 rounded-xl 
                       bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm sm:text-base 
                       transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                                <i className="fas fa-arrow-down text-white text-sm"></i>
                            </span>
                            Receive
                        </button>

                        {/* add  */}
                        <button
                            onClick={() => handlepay("add")}
                            className="group shine-btn flex items-center gap-2 w-28 sm:w-36 justify-center px-4 py-3 rounded-xl 
                       bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm sm:text-base 
                       transition-all shadow-sm hover:shadow-lg hover:-translate-y-1">
                            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                                <i className="fas fa-plus text-white text-sm"></i>
                            </span>
                            Add
                        </button>

                    </div>
                </div>


                {/* contact */}
                <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 transition-all duration-300">
                    <h1 className="text-lg font-semibold mb-6 text-gray-800">
                        Favorite Contacts
                    </h1>

                    <div className="grid grid-cols-4 gap-4">
                        {favuratecont.map((user, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center cursor-pointer group"
                            >
                                <div className="relative">
                                    <img
                                        className="rounded-xl h-16 w-16 object-cover shadow-sm 
                        group-hover:shadow-lg group-hover:-translate-y-1 
                        transition-all duration-300"
                                        src={user.img}
                                        alt={user.name}
                                    />

                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500
                    border-2 border-white rounded-full shadow-md"></span>
                                </div>

                                <span className="mt-2 text-gray-700 font-medium text-sm
                group-hover:text-blue-600 transition-colors">
                                    {user.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-4">
                {/* left  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="rounded-2xl shadow-xl h-full items-center bg-white p-6">
                        {/* pay quick section */}
                        <h2 className="font-semibold text-lg sm:text-xl text-gray-800 mb-4">Quick Pay</h2>

                        <div className="grid grid-cols-4 gap-6 text-center">

                            <div className="group flex flex-col items-center cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <i className="fas fa-bolt text-blue-600 text-xl"></i>
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Electricity</span>
                            </div>

                            <div className="group flex flex-col items-center cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <i className="fas fa-tint text-blue-600 text-xl"></i>
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Water</span>
                            </div>

                            <div className="group flex flex-col items-center cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <i className="fas fa-fire text-blue-600 text-xl"></i>
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Gas</span>
                            </div>

                            <div className="group flex flex-col items-center cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <i className="fas fa-wifi text-blue-600 text-xl"></i>
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Broadband</span>
                            </div>

                            <div className="group flex flex-col items-center cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <i className="fas fa-shield-alt text-blue-600 text-xl"></i>
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Insurance</span>
                            </div>

                            <div className="group flex flex-col items-center cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <i className="fas fa-mobile-alt text-blue-600 text-xl"></i>
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Mobile</span>
                            </div>

                            <div className="group flex flex-col items-center cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <i className="fas fa-sync-alt text-blue-600 text-xl"></i>
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Recharge</span>
                            </div>

                            <div className="group flex flex-col items-center cursor-pointer transition-all">
                                <div className="w-14 h-14 rounded-xl bg-white border border-blue-100 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    <i className="fas fa-credit-card text-blue-600 text-xl"></i>
                                </div>
                                <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-blue-600">Credit</span>
                            </div>

                        </div>

                    </div>

                    {/* upcomming pay */}
                    <div className="rounded-2xl bg-white border border-gray-100 shadow-md p-6 flex flex-col">

                        <h2 className="text-lg font-semibold text-gray-800 mb-5">
                            Upcoming Payments
                        </h2>

                        <div className="flex flex-col divide-y divide-gray-200">

                            <div className="flex justify-between items-center py-3">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-bolt text-blue-500"></i>
                                    <span className="text-gray-700 font-medium">Electricity Bill</span>
                                </div>
                                <span className="font-semibold text-gray-800">₹900</span>
                            </div>

                            <div className="flex justify-between items-center py-3">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-tint text-blue-500"></i>
                                    <span className="text-gray-700 font-medium">Water Bill</span>
                                </div>
                                <span className="font-semibold text-gray-800">₹300</span>
                            </div>

                            <div className="flex justify-between items-center py-3">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-fire text-blue-500"></i>
                                    <span className="text-gray-700 font-medium">Gas Bill</span>
                                </div>
                                <span className="font-semibold text-gray-800">₹1000</span>
                            </div>

                            <div className="flex justify-between items-center py-3">
                                <div className="flex items-center gap-2">
                                    <i className="fas fa-mobile-alt text-blue-500"></i>
                                    <span className="text-gray-700 font-medium">Mobile Recharge</span>
                                </div>
                                <span className="font-semibold text-gray-800">₹350</span>
                            </div>

                        </div>

                    </div>

                </div>
                {/* right */}
                <div className="flex flex-col gap-5">

                    <div className="flex flex-col gap-4">
                        <div className="rounded-2xl shadow-lg bg-white p-5 h-fit flex flex-col gap-4 transition-all duration-300 hover:shadow-2xl">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                Your Rewards
                            </h2>

                            <div className="flex flex-nowrap gap-4 overflow-x-auto pb-1">

                                <div
                                    className="dshine-button flex items-center justify-center gap-2 px-4 py-3 text-white 
          shadow-md hover:scale-110 transition-all duration-300 min-w-[140px] h-[60px] rounded-xl"
                                    style={{ background: "linear-gradient(90deg,#4BD8D0,#3EC4E1)" }}
                                >
                                    <i className="fas fa-star text-[18px]"></i>
                                    <span className="font-semibold whitespace-nowrap text-[15px]">Top Sender</span>
                                </div>

                                <div
                                    className="dshine-button flex items-center justify-center gap-2 px-4 py-3 text-white
          shadow-md hover:scale-110 transition-all duration-300 min-w-[140px] h-[60px] rounded-xl"
                                    style={{ background: "linear-gradient(90deg,#B54BFF,#E557B8)" }}
                                >
                                    <i className="fas fa-user-plus text-[18px]"></i>
                                    <span className="font-semibold whitespace-nowrap text-[15px]">First Referral</span>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="grid grid-cols-2 gap-4">

                        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between 
  hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-blue-100">

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-2 text-xl">
                                    <i className="fa-solid fa-gift"></i>
                                </div>
                                <h1 className="font-medium text-gray-800 text-xs">Gift Cards</h1>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-2 text-xl">
                                    <i className="fa-solid fa-coins"></i>
                                </div>
                                <h1 className="font-medium text-gray-800 text-xs">Cashback</h1>
                            </div>
                        </div>

                        <div onClick={()=>navigate("/transaction")} className="bg-blue-600 rounded-2xl p-6 flex flex-col items-center justify-center 
  text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <i className="fa-solid fa-wallet text-2xl mb-2"></i>
                            <h1 className="font-semibold text-center text-xs">Recent Transaction</h1>
                        </div>

                    </div>

                </div>
            </div>

            {/* 3 */}

            <div className="grid grid-cols-1 sm:grid-cols-[60%_40%] gap-4 mb-2">
                <div className="rounded-2xl shadow-xl bg-white dark:bg-gray-800 p-4 sm:p-6">
                    <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Recent Transactions
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[550px] border-collapse text-sm sm:text-base">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700/70 text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                                    <th className="p-3 font-semibold rounded-l-xl">From</th>
                                    <th className="p-3 font-semibold">Date & Time</th>
                                    <th className="p-3 font-semibold">Amount</th>
                                    <th className="p-3 font-semibold rounded-r-xl">Type</th>
                                </tr>
                            </thead>

                            <tbody>
                                {table.map((tx, idx) => {
                                    const isReceived = tx.type?.toLowerCase() === "received";
                                    const isAdded = tx.type === "add";
                                    return (
                                        <tr
                                            key={idx}
                                            className={`transition-all duration-300 group 
                ${idx % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900"}
                hover:bg-blue-50 dark:hover:bg-blue-900/40 hover:shadow-sm`}
                                        >
                                            <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100">
                                                {tx.from}
                                            </td>

                                            <td className="p-3 border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                                                {tx.date}
                                            </td>

                                            <td
                                                className={`p-3 border-b border-gray-200 dark:border-gray-700 font-semibold 
                  ${isReceived
                                                        ? "text-green-600 dark:text-green-400"
                                                        : isAdded
                                                            ? "text-blue-600 dark:text-blue-400"
                                                            : "text-red-600 dark:text-red-400"
                                                    }`}
                                            >
                                                ₹{tx.amount}
                                            </td>

                                            <td className="p-3 border-b border-gray-200 dark:border-gray-700">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
                    ${isReceived
                                                            ? "bg-green-100 text-green-700 dark:bg-green-800/50 dark:text-green-300"
                                                            : isAdded
                                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-800/50 dark:text-blue-300"
                                                                : "bg-red-100 text-red-700 dark:bg-red-800/50 dark:text-red-300"
                                                        }`}
                                                >
                                                    {tx.type}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div
                    className="rounded-2xl flex flex-col items-center p-6 w-full shadow-lg
  bg-white/90 backdrop-blur-md border border-blue-100
  hover:shadow-blue-200 hover:scale-[1.03] transition-all duration-300"
                >
                    {/* title */}
                    <div className="w-14 h-14 flex items-center justify-center rounded-full 
  bg-blue-500 text-white text-3xl shadow-md mb-3">
                        <i className="fas fa-gift"></i>
                    </div>

                    <h1 className="text-lg font-semibold text-gray-800">
                        Invite & Earn
                    </h1>

                    <h2 className="text-5xl font-extrabold mt-1 text-blue-600 tracking-wide">
                        ₹40
                    </h2>

                    <p className="mt-2 text-sm text-gray-600 text-center leading-tight">
                        Earn every time a friend joins using your referral link
                    </p>

                    {/* button */}
                    <button
                        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white 
    py-2.5 rounded-xl text-sm font-medium shadow-md transition-all"
                    >
                        Invite Now
                    </button>

                    <div className="flex gap-5 mt-4 text-xl text-gray-600">
                        <i className="fab fa-whatsapp hover:text-green-500 transition"></i>
                        <i className="fab fa-telegram hover:text-blue-500 transition"></i>
                        <i className="fab fa-instagram hover:text-pink-500 transition"></i>
                        <i className="fas fa-share-alt hover:text-gray-800 transition"></i>
                    </div>
                </div>

            </div>
            <div className="p-6"></div>
        </div >
    );
}
