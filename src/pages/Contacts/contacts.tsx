// import React from 'react';
// import {
//   Box,
//   Button,
//   Avatar,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   Typography,
// } from '@mui/material';

// interface Contact {
//   contactName: string;
//   companyName: string;
//   email: string;
//   phone?: string;
//   contactOwner: string;
// }

// const contacts: Contact[] = [
//   {
//     contactName: 'Ted Watson',
//     companyName: 'Zylker Corp',
//     email: 'support@bigin.com',
//     phone: '',
//     contactOwner: 'Pratik Sonawane',
//   },
// ];

// const getInitials = (name: string) =>
//   name
//     .split(' ')
//     .map((word) => word[0])
//     .join('');

// const ContactTable: React.FC = () => {
//   return (
//     <Box sx={{ p: 3 }}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6">All Contacts</Typography>
//         <Button variant="contained" color="success">
//           + Contact
//         </Button>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//             <TableRow>
//               <TableCell>Contact Name</TableCell>
//               <TableCell>Company Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Contact Owner</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {contacts.map((contact, index) => (
//               <TableRow key={index}>
//                 <TableCell sx={{ fontWeight: 'bold', color: '#1a73e8' }}>
//                   {contact.contactName}
//                 </TableCell>
//                 <TableCell>{contact.companyName}</TableCell>
//                 <TableCell>{contact.email}</TableCell>
//                 <TableCell>{contact.phone || '-'}</TableCell>
//                 <TableCell>
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Avatar sx={{ bgcolor: 'green' }}>
//                       {getInitials(contact.contactOwner)}
//                     </Avatar>
//                     <Typography>{contact.contactOwner}</Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//         <Typography variant="body2" color="text.secondary">
//           Total Contacts: {contacts.length} · Contacts With Open Pipelines: 1 · Without
//           Pipelines: 0 · Untouched: 0
//         </Typography>
//         <Box display="flex" alignItems="center" gap={1}>
//           <Typography variant="body2" color="text.secondary">
//             Records per page:
//           </Typography>
//           <Select size="small" defaultValue={20}>
//             <MenuItem value={20}>20</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ContactTable;

import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Checkbox,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  TextField,
  TablePagination,
  IconButton,
} from '@mui/material';
import { Edit, Save } from '@mui/icons-material';

interface Contact {
  contactName: string;
  companyName: string;
  email: string;
  phone?: string;
  contactOwner: string;
}

const initialContacts: Contact[] = [
  {
    contactName: 'Ted Watson',
    companyName: 'Zylker Corp',
    email: 'support@bigin.com',
    phone: '',
    contactOwner: 'Pratik Sonawane',
  },
  {
    contactName: 'Jane Doe',
    companyName: 'Alpha Inc',
    email: 'jane@alpha.com',
    phone: '9876543210',
    contactOwner: 'Harish Lodha',
  },
];

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('');

const ContactTable = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedRow, setEditedRow] = useState<Contact | null>(null);

  const filteredContacts = contacts.filter(
    (c) =>
      c.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditedRow({ ...contacts[index] });
  };

  const handleSave = () => {
    if (editedRow && editIndex !== null) {
      const updated = [...contacts];
      updated[editIndex] = editedRow;
      setContacts(updated);
      setEditIndex(null);
      setEditedRow(null);
    }
  };

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography fontWeight={500} variant="subtitle1">
          All Contacts
        </Typography>
        <TextField
          size="small"
          placeholder="Search contacts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="success">
          + Contact
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Contact Name</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  Contact Owner
                </Box>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredContacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((contact, index) => (
              <TableRow key={index} hover>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={editedRow?.contactName || ''}
                      onChange={(e) =>
                        setEditedRow((prev) => ({ ...prev!, contactName: e.target.value }))
                      }
                      size="small"
                    />
                  ) : (
                    <Typography fontWeight="bold">{contact.contactName}</Typography>
                  )}
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <TextField
                      value={editedRow?.companyName || ''}
                      onChange={(e) =>
                        setEditedRow((prev) => ({ ...prev!, companyName: e.target.value }))
                      }
                      size="small"
                    />
                  ) : (
                    contact.companyName
                  )}
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar
                      sx={{ bgcolor: 'lightgreen', color: 'black', fontSize: 12, width: 24, height: 24 }}
                    >
                      {getInitials(contact.contactOwner)}
                    </Avatar>
                    <Typography variant="body2">{contact.contactOwner}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  {editIndex === index ? (
                    <IconButton onClick={handleSave} size="small">
                      <Save fontSize="small" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleEdit(index)} size="small">
                      <Edit fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredContacts.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default ContactTable;
