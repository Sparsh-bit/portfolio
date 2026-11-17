import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/lightswind/magnetic-button";
import { Mark } from "@/components/Chrome";

/** 404 page — everything routable lives within three taps. */
export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center bg-paper px-6 pt-24 text-center">
      <Mark size={44} />
      <p className="t-mono mt-8 uppercase">Error 404 // off the map</p>
      <h1 className="t-h1 mt-4 max-w-[16ch]">
        This page hasn't been <span className="serif-it text-gold-ink">designed</span> yet
      </h1>
      <p className="t-lead mt-4 max-w-md">The link you followed doesn't exist — but the portfolio is one click away.</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/"><MagneticButton variant="dark" size="lg">Back home</MagneticButton></Link>
        <Link to="/work"><MagneticButton variant="outline" size="lg">View work</MagneticButton></Link>
      </div>
    </div>
  );
}
