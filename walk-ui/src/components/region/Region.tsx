// 📁 src/views/Region.tsx
import React, { useState } from 'react';
import {
  Stack,
  Text,
  PrimaryButton,
  DetailsList,
  IconButton,
  Dialog,
  DialogType,
  DialogFooter,
  DefaultButton,
  Modal,
  TextField,
} from '@fluentui/react';
import type { IColumn } from '@fluentui/react';
import { useRegions } from '../../hooks/useRegions';
import type { IRegion } from './RegionInterfaces';
import { useAuth } from '../../context/AuthContext';

const Region: React.FC = () => {
  const {
    regions,
    addRegion,
    updateRegion,
    deleteRegion,
  } = useRegions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);




  const handleEdit = (region: IRegion) => {
    setSelectedRegion(region);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleAddNew = () => {
    setSelectedRegion({ id: '', code: '', name: '', regionImageURL: '' });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedRegion?.code || !selectedRegion?.name) {
      alert('Code and Name are required');
      return;
    }

    if (selectedRegion.id) {
      await updateRegion(selectedRegion);
    } else {
      await addRegion(selectedRegion);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (deleteTargetId) {
      await deleteRegion(deleteTargetId);
      setDeleteTargetId(null);
    }
    setIsDeleteDialogOpen(false);
  };

const columns: IColumn[] = [
  {
    key: 'code',
    name: 'Code',
    fieldName: 'code',
    minWidth: 150,
    maxWidth: 150,
    isResizable: true,
  },
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 150,
    maxWidth: 150,
    isResizable: true,
  },
  {
    key: 'image',
    name: 'Image URL',
    fieldName: 'regionImageURL',
    minWidth: 150,
    maxWidth: 150,
    isResizable: true,
  },
  {
    key: 'actions',
    name: 'Actions',
    minWidth: 150,
    maxWidth: 150,
    isResizable: true,
    onRender: (item: IRegion) => (
      <Stack horizontal tokens={{ childrenGap: 10 }}>
        <IconButton iconProps={{ iconName: 'Edit' }} title="Edit" onClick={() => handleEdit(item)} />
        <IconButton iconProps={{ iconName: 'Delete' }} title="Delete" onClick={() => handleDelete(item.id)} />
      </Stack>
    ),
  },
];



  return (
    <Stack tokens={{ childrenGap: 20 }} styles={{ root: { padding: 24 } }}>
      <Text variant="xxLarge">Region API</Text>
      <PrimaryButton style={{maxWidth : '10%'}} text="Add New Region" onClick={handleAddNew} />
      <DetailsList items={regions} columns={columns} />

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onDismiss={() => setIsModalOpen(false)}
        isBlocking={false}
      >
        <div style={{ padding: 20, width: 400 }}>
          <Text variant="xLarge">{selectedRegion?.id ? 'Edit Region' : 'Add Region'}</Text>
          <Stack tokens={{ childrenGap: 15 }}>
            <TextField
              label="Code"
              value={selectedRegion?.code || ''}
              onChange={(_, v) => setSelectedRegion((prev) => ({ ...prev!, code: v || '' }))}
            />
            <TextField
              label="Name"
              value={selectedRegion?.name || ''}
              onChange={(_, v) => setSelectedRegion((prev) => ({ ...prev!, name: v || '' }))}
            />
            <TextField
              label="Image URL"
              value={selectedRegion?.regionImageURL || ''}
              onChange={(_, v) => setSelectedRegion((prev) => ({ ...prev!, regionImageURL: v || '' }))}
            />
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <PrimaryButton text="Save" onClick={handleSave} />
              <DefaultButton text="Cancel" onClick={() => setIsModalOpen(false)} />
            </Stack>
          </Stack>
        </div>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog
        hidden={!isDeleteDialogOpen}
        onDismiss={() => setIsDeleteDialogOpen(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: 'Confirm Delete',
          subText: 'Are you sure you want to delete this region?',
        }}
      >
        <DialogFooter>
          <PrimaryButton onClick={handleConfirmDelete} text="Yes" />
          <DefaultButton onClick={() => setIsDeleteDialogOpen(false)} text="No" />
        </DialogFooter>
      </Dialog>
    </Stack>
  );
};

export default Region;
