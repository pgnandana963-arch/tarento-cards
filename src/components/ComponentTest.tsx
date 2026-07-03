import { useState } from "react";
import { Inbox, Users } from "lucide-react";

import Avatar from "./Avatar";
import Badge from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import EmptyState from "./EmptyState";
import { Icon } from "./Icon";
import { Input } from "./Input";
import { Logo } from "./Logo";
import Modal from "./Modal";
import { Select } from "./Select";
import StatCard from "./StatCard";
import Table from "./Table";

type Employee = {
  name: string;
  role: string;
  status: "active" | "inactive" | "pending";
};

const employees: Employee[] = [
  { name: "Asha Rao", role: "Designer", status: "active" },
  { name: "Vikram Shah", role: "Engineer", status: "pending" },
  { name: "Meera Nair", role: "Manager", status: "inactive" },
];

export default function ComponentTest() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-off-white px-4 py-10 text-navy-500 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-500">
              UI playground
            </p>
            <h1 className="mt-1 text-3xl font-bold">Component test page</h1>
            <p className="mt-2 text-mid-gray">
              A visual reference for the shared Tarento components.
            </p>
          </div>
          <Logo size="md" />
        </header>

        <section>
          <SectionTitle title="Buttons and badges" />
          <Card>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Badge status="active" />
              <Badge status="pending" />
              <Badge status="inactive" />
            </div>
          </Card>
        </section>

        <section>
          <SectionTitle title="Avatars and icons" />
          <Card>
            <div className="flex flex-wrap items-center gap-5">
              <Avatar name="Asha Rao" size="sm" />
              <Avatar name="Vikram Shah" size="md" />
              <Avatar name="Meera Nair" size="lg" />
              <Avatar name="Tarento Team" size="xl" />
              <Icon icon={Users} tone="default" />
              <Icon icon={Users} tone="secondary" />
              <Icon icon={Users} tone="accent" />
              <Icon icon={Users} tone="disabled" />
            </div>
          </Card>
        </section>

        <section>
          <SectionTitle title="Form controls" />
          <Card>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Employee name"
                value={name}
                onChange={setName}
                placeholder="Enter a name"
                required
              />
              <Select
                label="Role"
                value={role}
                onChange={setRole}
                placeholder="Choose a role"
                options={[
                  { label: "Designer", value: "designer" },
                  { label: "Engineer", value: "engineer" },
                  { label: "Manager", value: "manager" },
                ]}
              />
              <Input
                label="Input with error"
                value="invalid@email"
                onChange={() => undefined}
                error="Enter a valid email address."
              />
              <Input
                label="Disabled input"
                value="Cannot edit this value"
                onChange={() => undefined}
                disabled
              />
            </div>
          </Card>
        </section>

        <section>
          <SectionTitle title="Cards and modal" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Active employees"
              value={128}
              trend={{ direction: "up", value: "12% this month" }}
              icon={Users}
            />
            <StatCard
              label="Pending requests"
              value={14}
              trend={{ direction: "down", value: "3% this month" }}
              icon={Inbox}
            />
            <Card className="flex flex-col justify-between gap-5">
              <div>
                <h3 className="font-semibold">Modal preview</h3>
                <p className="mt-2 text-sm text-mid-gray">
                  Open the modal to test its overlay, footer, and close action.
                </p>
              </div>
              <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                Open modal
              </Button>
            </Card>
          </div>
        </section>

        <section>
          <SectionTitle title="Table" />
          <Table
            columns={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              {
                key: "status",
                label: "Status",
                render: (employee) => <Badge status={employee.status} />,
              },
            ]}
            data={employees}
          />
        </section>

        <section>
          <SectionTitle title="Empty state" />
          <Card padding="sm">
            <EmptyState
              title="No cards found"
              description="Create the first digital business card for your team."
              action={{
                label: "Create card",
                onClick: () => setIsModalOpen(true),
              }}
            />
          </Card>
        </section>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example modal"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        <p className="text-sm text-mid-gray">
          This is sample content used to visualize the modal component.
        </p>
      </Modal>
    </main>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="mb-3 text-lg font-semibold">{title}</h2>;
}
