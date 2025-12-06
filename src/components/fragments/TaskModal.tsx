import React, { useState } from "react";
import { TaskStatus, type TaskInsert } from "../../types";
import Button from "../ui/Button";
import InputTitle from "../ui/forms/InputTitle";
import FormRow from "../ui/forms/FormRow";
import Select from "../ui/forms/Select";
import Input from "../ui/forms/Input";
import ModalHeader from "../ui/ModalHeader";
import DescriptionSection from "../ui/forms/DescriptionSection";
import { createPost } from "../../services/todoService";

interface TaskModalProps {
  isOpen: boolean;
  // onDelete: (id: string) => void;
  // handleSave: (data: any) => void;
  // task: any; // or replace with proper Task type
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  // onDelete,
  // handleSave,
  // task,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.Backlog);
  const [tags, setTags] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [task, setTask] = useState({});

  const onClose = () => {
    isOpen = false;
  };
  const onDelete = (id: string) => {
    return id;
  };

  const handleSave = async () => {
    const payload: TaskInsert = {
      title,
      description,
      status,
      tags: tags.split(",").map((t) => t.trim()),
      startDate,
      dueDate,
      assignee: undefined,
    };

    await createPost(payload);

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Actions */}
        <ModalHeader
          showDelete={!!task}
          lastEdited={task ? "Last edited today" : undefined}
          onClose={onClose}
          onDelete={() => {
            onDelete(task.id);
            onClose();
          }}
        />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
          <div className="max-w-3xl mx-auto px-6 sm:px-12 py-12">
            {/* Icon Placeholder */}
            <div className="group relative w-16 h-16 -mt-4 mb-6 flex items-center justify-center text-4xl hover:bg-slate-100 rounded cursor-pointer transition-colors select-none">
              📋
            </div>

            <InputTitle title={title} onChange={setTitle} />
            <div className="flex flex-col gap-1 mb-10">
              <FormRow label="Status">
                <Select
                  value={status}
                  onChange={(val) => setStatus(val as TaskStatus)}
                  options={Object.values(TaskStatus)}
                />
              </FormRow>
              <FormRow label="Tags">
                <Input value={tags} onChange={setTags} placeholder="Tags..." />
              </FormRow>
              <FormRow label="Start Date">
                <Input type="date" value={startDate} onChange={setStartDate} />
              </FormRow>
              <FormRow label="Due Date">
                <Input type="date" value={dueDate} onChange={setDueDate} />
              </FormRow>
            </div>
            <hr className="border-slate-100 mb-8" />
            <DescriptionSection value={description} onChange={setDescription} />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 flex justify-end items-center gap-3 bg-white shrink-0">
          <Button variant="secondary">Close</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
