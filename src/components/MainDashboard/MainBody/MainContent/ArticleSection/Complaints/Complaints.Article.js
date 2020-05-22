import React from "react";
import {Table} from "react-bootstrap";
import Wrapper from '../../../../UI/Wrapper/Wrapper'
const ComplaintTable = () => {
  return (
    <Wrapper heading = "Your Complaints">
    <Table  bordered hover size="sm">
  <thead>
    <tr>
      <th>Department</th>
      <th>Issue Id</th>
      <th>Assigned To</th>
      <th>Locked To</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Admin</td>
      <td>!JQicd</td>
      <td>Otto</td>
      <td>open</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>!JQicd</td>
      <td>Otto</td>
      <td>open</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>!JQicd</td>
      <td>Otto</td>
      <td>open</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>!JQicd</td>
      <td>Otto</td>
      <td>open</td>
    </tr>
    <tr>
      <td>Admin</td>
      <td>!JQicd</td>
      <td>Otto</td>
      <td>open</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
    </Wrapper>
  );
};

export default ComplaintTable;
