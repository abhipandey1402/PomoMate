import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock } from 'lucide-react';

interface TimeRequired {
    hours: number;
    minutes: number;
}

interface TaskFormData {
    title: string;
    description: string;
    totalTimeRequired: TimeRequired;
    dueDate: string;
}

interface AddTaskModalProps {
    formData: TaskFormData;
    setFormData: React.Dispatch<React.SetStateAction<TaskFormData>>;
    handleSubmit: (e: React.FormEvent) => void;
    isOpen: boolean;
    toggleDialog: (state: boolean) => void;
}

const AddTaskForm: React.FC<AddTaskModalProps> = ({ formData, setFormData, handleSubmit, isOpen, toggleDialog }) => {
    return (
        <Dialog open={isOpen} onOpenChange={toggleDialog}>
            <DialogContent className="sm:max-w-screen-sm w-1/2">
                <DialogHeader>
                    <DialogTitle className='text-3xl'>Add New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-3xl font-medium mb-1">
                            Title
                        </label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter task title"
                            required
                            className='text-gray-600 p-8 font-normal'
                            style={{ fontSize: "1.75rem" }}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-3xl font-medium mb-1">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Enter task description"
                            className='h-48 text-gray-600 p-8 font-normal'
                            style={{ fontSize: "1.75rem" }}
                        />
                    </div>

                    <div>
                        <label className="block text-3xl font-medium mb-1">
                            Time Required (hh:mm)
                        </label>
                        <div className="flex gap-2 items-center">
                            <div className="flex-1">
                                <Input
                                    type="number"
                                    min="0"
                                    value={formData?.totalTimeRequired?.hours}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        totalTimeRequired: {
                                            ...formData.totalTimeRequired,
                                            hours: parseInt(e.target.value) || 0
                                        }
                                    })}
                                    placeholder="Hours"
                                    className='text-gray-600 p-8 font-normal'
                                    style={{ fontSize: "1.75rem" }}
                                />
                            </div>
                            <div className="flex-1">
                                <Input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={formData.totalTimeRequired.minutes}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        totalTimeRequired: {
                                            ...formData.totalTimeRequired,
                                            minutes: parseInt(e.target.value) || 0
                                        }
                                    })}
                                    placeholder="Minutes"
                                    className='text-gray-600 p-8 font-normal'
                                    style={{ fontSize: "1.75rem" }}
                                />
                            </div>
                            <Clock className="text-gray-500" size={20} />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="dueDate" className="block text-3xl font-medium mb-1">
                            Due Date
                        </label>
                        <Input
                            id="dueDate"
                            type="datetime-local"
                            value={formData.dueDate}
                            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            required
                            className='text-gray-600 p-8 font-normal'
                            style={{ fontSize: "1.75rem" }}
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <DialogTrigger asChild>
                            <Button className='text-3xl py-8 px-6 bg-white border-black text-black hover:bg-gray-100'>Cancel</Button>
                        </DialogTrigger>
                        <Button type="submit" className='text-3xl py-8 px-6'>Add Task</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTaskForm;
