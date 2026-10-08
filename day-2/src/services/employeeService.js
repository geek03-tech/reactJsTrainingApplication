import { apiRequest } from './apiClient';

const departments = ['Engineering', 'Human Resources', 'Design', 'Finance', 'Operations'];

function getSafeAvatarUrl(userId, avatar) {
  if (!avatar) {
    return `https://i.pravatar.cc/150?u=${encodeURIComponent(userId)}`;
  }

  try {
    const parsedUrl = new URL(avatar);
    if (parsedUrl.hostname.includes('reqres.in')) {
      return `https://i.pravatar.cc/150?u=${encodeURIComponent(userId)}`;
    }
  } catch {}

  return avatar;
}

function mapUser(user, index = 0) {
  const first = user.first_name || user.name?.split(' ')[0] || 'New';
  const last = user.last_name || user.name?.split(' ').slice(1).join(' ') || 'Employee';
  const id = String(user.id);

  return {
    id,
    name: `${first} ${last}`.trim(),
    email: user.email || `${first.toLowerCase()}@reqres.in`,
    role: user.job || ['Frontend Developer', 'QA Engineer', 'Product Designer', 'HR Manager'][index % 4],
    department: departments[index % departments.length],
    status: index % 4 === 2 ? 'On Leave' : 'Active',
    avatar: getSafeAvatarUrl(id, user.avatar)
  };
}

export async function getEmployees(page = 1) {
  const result = await apiRequest(`/users?page=${page}`);
  return { ...result, data: result.data.map((user, index) => mapUser(user, index + (page - 1) * 6)) };
}

export async function getAllEmployees() {
  const first = await getEmployees(1);
  const pages = [];
  for (let page = 2; page <= (first.total_pages || 1); page++) pages.push(await getEmployees(page));
  return { ...first, data: [first.data, ...pages.map(p => p.data)].flat(), total_pages: first.total_pages || 1 };
}

export async function getEmployee(id) {
  const result = await apiRequest(`/users/${id}`);
  return mapUser(result.data);
}

export async function createEmployee(employee) {
  const result = await apiRequest('/users', { method: 'POST', body: JSON.stringify({ name: employee.name, job: employee.role }) });
  return {
    ...employee,
    id: String(result.id),
    avatar: getSafeAvatarUrl(String(result.id), employee.avatar),
    createdAt: result.createdAt
  };
}

export async function updateEmployee(id, employee) {
  const result = await apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ ...employee})
  });
  return { ...employee, id: String(id), updatedAt: result.updatedAt };
}

export async function deleteEmployee(id) {
  await apiRequest(`/users/${id}`, { method: 'DELETE' });
  return id;
}

export async function login(email, password) {
  return apiRequest('/login', { method: 'POST', body: JSON.stringify({ email, password }) });
}
