export type IssueStatus = 'Open' | 'In progress' | 'Closed'
export type StatusFilter = 'All' | 'Open items' | IssueStatus

export interface EquipmentIssue {
  id: string
  name: string
  category: string
  location: string
  issue: string
  status: IssueStatus
  owner: string
  handover: string
}

export const equipment: EquipmentIssue[] = [
  {
    id: 'EX-104', name: 'Excavator 104', category: 'Excavator',
    location: 'North pit', issue: 'Inspection record awaiting review',
    status: 'Open', owner: 'Maintenance team',
    handover: 'Inspection record has been attached to the fictional work log. Review is still pending.',
  },
  {
    id: 'HT-208', name: 'Haul truck 208', category: 'Haul truck',
    location: 'Workshop', issue: 'Service documentation in progress',
    status: 'In progress', owner: 'Workshop team',
    handover: 'The workshop team is updating the service record. Next shift needs the documentation update.',
  },
  {
    id: 'DZ-012', name: 'Dozer 012', category: 'Dozer',
    location: 'West bench', issue: 'Follow-up entry needs an owner',
    status: 'Open', owner: 'Unassigned',
    handover: 'A follow-up was recorded in the mock shift log. The coordination team has not assigned an owner.',
  },
  {
    id: 'WT-031', name: 'Water truck 031', category: 'Water truck',
    location: 'Support area', issue: 'Daily log reconciled',
    status: 'Closed', owner: 'Support team',
    handover: 'Both shifts reviewed the fictional log entry. No further documentation action is listed.',
  },
  {
    id: 'HT-211', name: 'Haul truck 211', category: 'Haul truck',
    location: 'South pit', issue: 'Shift report attachment missing',
    status: 'Open', owner: 'Shift coordination',
    handover: 'The shift report references an attachment that is not in the mock record yet.',
  },
]

export const statusFilters: StatusFilter[] = ['All', 'Open items', 'Open', 'In progress', 'Closed']

export function filterEquipment(query: string, status: StatusFilter) {
  const search = query.trim().toLowerCase()
  return equipment.filter((item) => {
    const matchesStatus = status === 'All'
      || (status === 'Open items' ? item.status !== 'Closed' : item.status === status)
    return matchesStatus && [item.id, item.name, item.issue, item.location, item.owner]
      .some((value) => value.toLowerCase().includes(search))
  })
}
