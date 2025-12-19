import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Truck,
  MapPin,
  ClipboardList,
  ClipboardCheck,
  Boxes,
  UserPlus,
  Users,
  Send,
} from "lucide-react";

const linkBase =
  "flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-all";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-brand text-white">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-white/15">
        <h1 className="text-lg font-semibold tracking-wide">
          SMG Transport Portal
        </h1>
      </div>

      <nav className="p-4 space-y-6">
        {/* MAIN */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-wider text-white/60">
            Main
          </p>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/request"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <Truck size={18} />
            Request Vehicle
          </NavLink>

          <NavLink
            to="/track"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <MapPin size={18} />
            Track Vehicle
          </NavLink>
        </div>

        {/* OPERATIONS */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-wider text-white/60">
            Operations
          </p>

          <NavLink
            to="/checksheets"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <ClipboardList size={18} />
            Delivery CheckSheets
          </NavLink>

          <NavLink
            to="/pdi"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <ClipboardCheck size={18} />
            PDI Inspection
          </NavLink>
        </div>

        {/* LOGISTICS */}
        <div>
          <p className="mb-2 text-xs uppercase tracking-wider text-white/60">
            Logistics
          </p>

          <NavLink
            to="/logistics"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <Boxes size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/logistics/add-partner"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <UserPlus size={18} />
            Add Partner
          </NavLink>

          <NavLink
            to="/logistics/manage-partners"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <Users size={18} />
            Manage Partners
          </NavLink>

          <NavLink
            to="/logistics/request"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`
            }
          >
            <Send size={18} />
            Request Transport
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
