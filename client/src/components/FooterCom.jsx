import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div>
        <div>
          <div>
            <Link
              to="/"
              className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
              <span
                className="px-1 py-2 
        bg-gradient-to-r from-indigo-500 via-slate-500 to-red-500 rounded-lg text-white"
              >
                Vivek's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm: mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="ABOUT" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">site</Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Vivek'blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="FOLLOW US" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="http://www.github.com/calverMingo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#">Discord</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="LEGAL" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms & Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between ">
          <Footer.Copyright
            href="#"
            by="Vivek's Blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook}></Footer.Icon>
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon
              href="http://www.github.com/calverMingo"
              icon={BsGithub}
            />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
