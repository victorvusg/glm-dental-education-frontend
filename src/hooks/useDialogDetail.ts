import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDialogDetailAction } from '../store/dialog/actions';
import { DialogDetailWithMessage } from '../store/dialog/types';
import { useSelector } from 'react-redux';
import { selectDialogDetailState } from '../store/dialog/selectors';

interface Props {
  dialogId?: string;
}

const useDialogDetail = ({ dialogId }: Props) => {
  const dispatch = useDispatch();

  const dialogDetail: DialogDetailWithMessage | null = useSelector(
    selectDialogDetailState
  );

  const fetchDialogDetail = useCallback(() => {
    if (!dialogId) return;
    dispatch(fetchDialogDetailAction(dialogId));
  }, [dispatch, dialogId]);

  return {
    dialogDetail,
    fetchDialogDetail,
  };
};

export default useDialogDetail;
