import React, { useState } from 'react';
import { useWalks } from '../../hooks/useWalks';
import type { IWalk } from './WalkInterface';
import {
    Stack,
    TextField,
    PrimaryButton,
    Spinner,
    DetailsList,
    DetailsListLayoutMode,
    IconButton,
    Dialog,
    DialogType,
    DialogFooter,
} from '@fluentui/react';
import type { IColumn } from '@fluentui/react';

const Walk: React.FC = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [walkToDelete, setWalkToDelete] = useState<IWalk | null>(null);

    const [newWalk, setNewWalk] = useState<IWalk>({
        name: '',
        description: '',
        lengthInKm: 0,
        regionId: '',
        difficultyId: '',
    });

    const { walks, loading, setQueryParams, fetchWalks, addWalk, updateWalk, deleteWalk } = useWalks();

    const handleEdit = (walk: IWalk) => {
        setEditing(true);
        setNewWalk(walk);
        setIsDialogOpen(true);
    };

    const handleDelete = (walk: IWalk) => {
        setWalkToDelete(walk);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (walkToDelete) {
            await deleteWalk(walkToDelete.id!);
            setWalkToDelete(null);
            setIsDeleteDialogOpen(false);
            await fetchWalks();
        }
    };

    const handleInputChange = (key: keyof IWalk, value: string | number) => {
        setNewWalk(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        if (editing && newWalk.id) {
            await updateWalk(newWalk);
        } else {
            await addWalk(newWalk);
        }

        setIsDialogOpen(false);
        setEditing(false);
        setNewWalk({
            name: '',
            description: '',
            lengthInKm: 0,
            regionId: '',
            difficultyId: '',
        });
        await fetchWalks(); // Refresh list
    };

    const columns: IColumn[] = [
        { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, isResizable: true },
        { key: 'description', name: 'Description', fieldName: 'description', minWidth: 150, isResizable: true },
        { key: 'lengthInKm', name: 'Length (Km)', fieldName: 'lengthInKm', minWidth: 80 },
        { key: 'regionId', name: 'Region', fieldName: 'regionId', minWidth: 100 },
        { key: 'difficultyId', name: 'Difficulty', fieldName: 'difficultyId', minWidth: 100 },
        {
            key: 'actions',
            name: 'Actions',
            minWidth: 100,
            onRender: (item: IWalk) => (
                <Stack horizontal tokens={{ childrenGap: 8 }}>
                    <IconButton iconProps={{ iconName: 'Edit' }} title="Edit" onClick={() => handleEdit(item)} />
                    <IconButton iconProps={{ iconName: 'Delete' }} title="Delete" onClick={() => handleDelete(item)} />
                </Stack>
            ),
        },
    ];

    return (
        <Stack tokens={{ childrenGap: 15 }} styles={{ root: { padding: 20 } }}>
            <h1>Walks</h1>

            <Stack horizontal horizontalAlign="start">
                <PrimaryButton
                    text="Add New Walk"
                    onClick={() => {
                        setEditing(false);
                        setNewWalk({
                            name: '',
                            description: '',
                            lengthInKm: 0,
                            regionId: '',
                            difficultyId: '',
                        });
                        setIsDialogOpen(true);
                    }}
                    styles={{
                        root: {
                            width: 150,
                            padding: '4px 8px',
                            fontSize: 14,
                        },
                    }}
                />
            </Stack>

            {loading ? (
                <Spinner label="Loading walks..." />
            ) : (
                <DetailsList
                    items={walks}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                    selectionPreservedOnEmptyClick
                />
            )}

            {/* Add/Edit Dialog */}
            <Dialog
                hidden={!isDialogOpen}
                onDismiss={() => setIsDialogOpen(false)}
                dialogContentProps={{
                    type: DialogType.largeHeader,
                    title: editing ? 'Edit Walk' : 'Add New Walk',
                }}
            >
                <Stack tokens={{ childrenGap: 10 }}>
                    <TextField
                        label="Name"
                        value={newWalk.name}
                        onChange={(_, val) => handleInputChange('name', val || '')}
                        required
                    />
                    <TextField
                        label="Description"
                        value={newWalk.description}
                        onChange={(_, val) => handleInputChange('description', val || '')}
                        multiline
                        required
                    />
                    <TextField
                        label="Length (Km)"
                        type="number"
                        value={newWalk.lengthInKm.toString()}
                        onChange={(_, val) => handleInputChange('lengthInKm', Number(val))}
                        required
                    />
                    <TextField
                        label="Region ID"
                        value={newWalk.regionId}
                        onChange={(_, val) => handleInputChange('regionId', val || '')}
                        required
                    />
                    <TextField
                        label="Difficulty ID"
                        value={newWalk.difficultyId}
                        onChange={(_, val) => handleInputChange('difficultyId', val || '')}
                        required
                    />
                </Stack>

                <DialogFooter>
                    <PrimaryButton text={editing ? 'Update' : 'Submit'} onClick={handleSubmit} />
                    <PrimaryButton text="Cancel" onClick={() => setIsDialogOpen(false)} />
                </DialogFooter>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                hidden={!isDeleteDialogOpen}
                onDismiss={() => setIsDeleteDialogOpen(false)}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Confirm Delete',
                    subText: `Are you sure you want to delete "${walkToDelete?.name}"?`,
                }}
            >
                <DialogFooter>
                    <PrimaryButton text="Yes, Delete" onClick={handleDeleteConfirm} />
                    <PrimaryButton text="Cancel" onClick={() => setIsDeleteDialogOpen(false)} />
                </DialogFooter>
            </Dialog>
        </Stack>
    );
};

export default Walk;
